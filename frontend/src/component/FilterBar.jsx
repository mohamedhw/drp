import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { setCurrentPage } from "../redux/action/pages";
import { connect } from "react-redux"

const FilterBar = ({setCurrentPage}) => {




    return (

        <Container className="my-4">
            <div>
                <Link className="px-1 px-lg-2" to='/top' onClick={()=>(setCurrentPage(null))}><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Top</Button></Link>
                <Link className="px-1 px-lg-2" to='/latest' onClick={()=>(setCurrentPage(null))}><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Latest</Button></Link>
                <Link className="px-1 px-lg-2" to='/random' onClick={()=>(setCurrentPage(null))}><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Random</Button></Link>
            </div>
        </Container>

    )

}






export default connect(null, { setCurrentPage })(FilterBar)
