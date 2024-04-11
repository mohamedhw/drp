import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactCrop from 'react-image-crop'
import { profile, profile_update } from '../redux/action/profile'
import { connect } from 'react-redux'
import Loading from './Loading';


function Cover({loading, show, setShow, coverPic, profile, profile_update}) {
    const [initialCover, setInitalCover] = useState()
    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        height: 45,
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };


    // Check if coverPic is a Blob or File before using FileReader
    if (coverPic instanceof Blob || coverPic instanceof File) {
      const reader = new FileReader();
      // Set up an event listener for when the FileReader has finished reading
      reader.onloadend = function() {
        // Do something with the data URL
        const result = reader.result;
        setInitalCover(result)
      };
      reader.readAsDataURL(coverPic);
    }

    const generateRandomImageName = () => {
        // Generate a random number between 1 and 100000 (adjust the range as needed)
        const randomNumber = Math.floor(Math.random() * 100000) + 1;

        // Create a timestamp to add uniqueness
        const timestamp = Date.now();

        // Combine the random number and timestamp to create a unique image name
        const imageName = `${randomNumber}_${timestamp}.jpg`;

        return imageName;
    };

    // Example usage:
    const randomImageName = generateRandomImageName();
    const getCroppedImg = (image, completedCrop, fileName) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const cover_ = document.getElementById('cover');
            const img = new Image();

            img.onload = () => {

                const scaleX = img.naturalWidth / cover_.width;
                const scaleY = img.naturalHeight / cover_.height;
                canvas.width = completedCrop.width * scaleX;
                canvas.height = completedCrop.height * scaleY;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(
                    img,
                    completedCrop.x * scaleX,
                    completedCrop.y * scaleY,
                    completedCrop.width * scaleX,
                    completedCrop.height * scaleY,
                    0,
                    0,
                    completedCrop.width * scaleX,
                    completedCrop.height * scaleY
                );

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Canvas is empty'));
                            return;
                        }
                        // Set the name property of the Blob
                        blob.name = fileName;
                        resolve(blob);
                    },
                    'image/jpeg', // Change the format if needed
                    1.0 // Change the quality if needed
                );
            };

            // Set the source of the image to the data URL
            img.src = image;
        });
    };
    const [uploading, setUploading] = useState(false);

    const submitcroppedimage = async () => {
        try {
            if (initialCover && completedCrop) {
                // Start the uploading process
                setUploading(true);
                // Call getCroppedImg and handle the returned Blob
                const croppedImageBlob = await getCroppedImg(initialCover, completedCrop, randomImageName);
                // Create a File object from the Blob
                const croppedImageFile = new File([croppedImageBlob], randomImageName, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                });

                // Create a FormData object to send the image as part of the request payload
                let form_data = new FormData();
                form_data.append('cover', croppedImageFile);
                // Dispatch the Redux action to update the cover image
                await profile_update(form_data);

                await profile();
                // Reset the component state and close the modal
                setShow(false);
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            // Set the upload error state to display an error message to the user
            // Reset the uploading state
            setUploading(false)
        }
    };
    if (uploading) {
        return <Loading />;
    }
    return (
        <>
            { initialCover &&
                <Modal
                    size="lg"
                    show={show}
                    centered
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Custom Modal Styling
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ReactCrop
                                aspect={4 / 1}
                                src={initialCover}
                                crop={crop}
                                onChange={c => setCrop(c)}
                                onComplete={handleCropComplete}
                            >
                                <img id="cover" src={initialCover} style={{ width: "auto" }} />
                            </ReactCrop>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={submitcroppedimage}>submit</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}

const mapStateToProps = state => ({
    loading: state.pics.loading
})

export default connect(mapStateToProps, { profile, profile_update })(Cover);

