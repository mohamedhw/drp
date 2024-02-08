import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



const FilterBar = () => {




    return (

        <Container className="my-4">
            <div>
                <Link className="px-1 px-lg-2" to='/top'><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Top</Button></Link>
                <Link className="px-1 px-lg-2" to='/latest'><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Latest</Button></Link>
                <Link className="px-1 px-lg-2" to='/random'><Button className="btn btn-success btn-s" style={{ minWidth: "70px" }}>Random</Button></Link>
            </div>
        </Container>

    )

}






export default FilterBar;
