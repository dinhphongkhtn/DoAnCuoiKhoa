import {combineReducers} from 'redux';
import  loginReducer  from "./loginReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
const rootReducer = combineReducers({loginReducer,productReducer,cartReducer,orderReducer});

export default rootReducer;
