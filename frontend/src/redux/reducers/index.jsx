import { combineReducers } from "redux";
import pics from './pics'
import auth from './auth'
import profile from "./profile";
import pages from "./pages"




export default combineReducers({
    pics,
    auth,
    profile,
    pages
})