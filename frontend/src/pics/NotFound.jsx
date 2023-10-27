import Container from "react-bootstrap/esm/Container"




const NotFound = () => {
    return (
        <Container style={{color: "#00dba0", fontSize: "60px"}}>
            <h1 className="mt-5 pt-5 not-found-txt" style={{color: "#00dba0", fontSize: "60px"}}>404 Page NotFound</h1>
            <div className="not-found" style={{display: "block"}}>
                <span className="not-found1" style={{display: "block"}}>\_(-_-)_/</span>
                <span className="not-found2" style={{display: "block", height: "auto !important"}}>|<span className="m-2"></span>|</span>
            </div>
        </Container>
    )
}

export default NotFound