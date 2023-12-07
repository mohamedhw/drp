import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"



const FilterBar = () => {




 return (
     
     <Container className="my-4">
        <div>
            <Link className="px-1 px-lg-2" to='/top'><Button className="btn btn-success btn-s" style={{width: "70px"}}>top</Button></Link>
            <Link className="px-1 px-lg-2" to='/latest'><Button className="btn btn-success btn-s" style={{width: "70px"}}>latest</Button></Link>
            <Link className="px-1 px-lg-2" to='/random'><Button className="btn btn-success btn-s" style={{width: "70px"}}>random</Button></Link> 
            <Link className="px-1 px-lg-2" to='/tags/'><Button className="btn btn-success btn-s" style={{width: "70px"}}>tags</Button></Link>
        </div>
     </Container>
     
 )

}






export default FilterBar;
