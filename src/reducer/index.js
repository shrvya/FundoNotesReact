import {combineReducers} from "redux";
import SearchReducer from "./search"
const rootReducers=combineReducers({
    allNotes:SearchReducer
    
})
export default rootReducers;