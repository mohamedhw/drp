import { Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux';


const PrivateRoute = ({isAuthenticated, setModalShow}) => {
    if (isAuthenticated){
        return (
            <Outlet/>
        )
    }
    else if (isAuthenticated === null){
        return (
            <Outlet/>
        )    
    }
    else{
        setModalShow(true)
        return (
            <Navigate to={'/'}/>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
export default connect(mapStateToProps, {})(PrivateRoute);
