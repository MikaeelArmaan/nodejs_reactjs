import { combineReducers } from "redux";
import { auth } from "./auth";
import { document } from './document';
import { alert } from './alert';
import { loading } from './loading';
import { orders } from "./orders";

export default combineReducers({
    auth,
    document,
    orders,
    alert,
    loading,
});