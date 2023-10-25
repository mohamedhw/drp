import { combineReducers } from "redux";
import pics from './pics'
import auth from './auth'

export default combineReducers({
    pics,
    auth
})