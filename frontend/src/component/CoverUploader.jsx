import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactCrop from 'react-image-crop'
import { profile, profile_update } from '../redux/action/profile'
import { connect } from 'react-redux'


function Cover({show, setShow, coverPic, profile, profile_update, image_global}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [initialCover, setInitalCover] = useState()
  const [crop, setCrop] = useState({
    unit: '%',
    // x: 25,
    // y: 25,
    width: 100,
    height: 45,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')


  // Check if coverPic is a Blob or File before using FileReader
  if (coverPic instanceof Blob || coverPic instanceof File) {
    const reader = new FileReader();
    // Set up an event listener for when the FileReader has finished reading
    reader.onloadend = function () {
      // Do something with the data URL
      const result = reader.result;
      setInitalCover(result)

    };
    reader.readAsDataURL(coverPic);
  } else {
    console.error("Invalid coverPic type. Expected Blob or File.");
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

  console.log(completedCrop)
  // Example usage:
  const randomImageName = generateRandomImageName();
  const getCroppedImg = (image, completedCrop, fileName) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const cover_ = document.getElementById('cover');
      const img = new Image();

      img.onload = () => {
        console.log('Image Natural Dimensions:', img.naturalWidth, img.naturalHeight);

        const scaleX = img.naturalWidth / cover_.width;
        const scaleY = img.naturalHeight / cover_.height;
        console.log('cr', img.width)
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

        console.log("img", img.width)
        console.log("x*scalx", completedCrop.x * scaleX)
        console.log("y*scaly", completedCrop.y * scaleY)
        console.log("width*scalx", completedCrop.width * scaleX)
        console.log("height*scaly", completedCrop.height * scaleY)
        console.log("width", completedCrop.width * scaleX)
        console.log("height", completedCrop.height * scaleY)
        // ... rest of the code
        // Convert the canvas to Blob
        console.log(canvas)
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
          // 'image/jpeg', // Change the format if needed
          // 0.9 // Change the quality if needed
        );
      };

      // Set the source of the image to the data URL
      img.src = image;
    });
  };
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const submitcroppedimage = async () => {
    try {
      if (initialCover && completedCrop) {
        // Start the uploading process
        setUploading(true);

        // Call getCroppedImg and handle the returned Blob
        const croppedImageBlob = await getCroppedImg(initialCover, completedCrop, randomImageName);
        // Create a File object from the Blob
        console.log(croppedImageBlob)
        const croppedImageFile = new File([croppedImageBlob], randomImageName, {
          // type: 'image/jpeg',
          lastModified: Date.now(),
        });

        // Create a FormData object to send the image as part of the request payload
        const form_data = new FormData();
        form_data.append('cover', croppedImageFile);
        // Dispatch the Redux action to update the cover image
        await profile_update(form_data);

        // Fetch the updated profile data after the image is uploaded
        await profile();

        // Reset the component state and close the modal
        setUploading(false);
        setShow(false);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      // Set the upload error state to display an error message to the user
      setUploadError('Failed to upload image. Please try again.');
      // Reset the uploading state
      setUploading(false);
    }
  };
  return (
    <>
      {initialCover &&
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
              aspect={4/1}
              src={initialCover}
              crop={crop}
              onChange={c=>setCrop(c)}
                
              onComplete={(e)=>{
                  setCompletedCrop(e)
                }}
              // onImageLoaded={handleImageLoaded} // Add this line
              // locked={true} // Set this to true to disable cropping
            >
              <img id="cover" src={initialCover} style={{width: "auto"}}/>
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
    image_global: state.profile.image,
})
export default connect(null, { profile, profile_update }) (Cover);

