import {
 ORDER_LOADED, REMOVE_LOADING, SET_LOADING
} from "./types";
import axios from "axios";
import { api_provider } from "../utils/apiProvider";
import { CREATE_DOCUMENT , GET_ORDERS , DELETE_DOCUMENT } from "../utils/end_points";
import { setAlert } from "./alert";


const getFilters = (data)=>{
    const filters = {}
    data.forEach(d => {
        if (d.department) {
            if (filters.department && !filters.department.find(f => f === d.department)) {
                filters.department.push(d.department);
            } else if (!filters.department) {
                filters.department = [d.department];
            }
        }
        if (d.documentType) {
            if (filters.documentType && !filters.documentType.find(f => f === d.documentType)) {
                filters.documentType.push(d.documentType);
            } else if (!filters.documentType) {
                filters.documentType = [d.documentType];
            }
        }
        if (d.geography) {
            if (filters.geography && !filters.geography.find(f => f === d.geography)) {
                filters.geography.push(d.geography);
            } else if (!filters.geography) {
                filters.geography = [d.geography];
            }
        }
        if (d.technology) {
            if (filters.technology && !filters.technology.find(f => f === d.technology)) {
                filters.technology.push(d.technology);
            } else if (!filters.technology) {
                filters.technology = [d.technology];
            }
        }
        if (d.domain) {
            if (filters.domain && !filters.domain.find(f => f === d.domain)) {
                filters.domain.push(d.domain);
            } else if (!filters.domain) {
                filters.domain = [d.domain];
            }
        }
        if (d.client) {
            if (filters.client && !filters.client.find(f => f === d.client)) {
                filters.client.push(d.client);
            } else if (!filters.client) {
                filters.client = [d.client];
            }
        }
        if (d.fileType) {
            if (filters.fileType && !filters.fileType.find(f => f === d.fileType)) {
                filters.fileType.push(d.fileType);
            } else if (!filters.fileType) {
                filters.fileType = [d.fileType];
            }
        }
    });

    for (let key in filters) {
        filters[key].sort();
    }

    return filters;
}

//get documents
export const get_orders = (body,description) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING })
        try {
            const res = await axios.get(api_provider(GET_ORDERS), { params: { body,description } });
            dispatch({ type: REMOVE_LOADING })
            if (res && res.data && res.data.result) {
                const filters = (body && Object.keys(body).length === 0) ? getFilters(res.data.result) : null;
                
                dispatch({
                    type: ORDER_LOADED,
                    payload: { orders: res.data.result, filters: filters },
                });

            } else {
                dispatch({
                    type: ORDER_LOADED,
                    payload: { orders: [], filters: {} },
                });
            }

        } catch (err) {
            dispatch({ type: REMOVE_LOADING });
            if (err && err.response && err.response.data && err.response.data.message) {
                dispatch(setAlert(err.response.data.message, 'error'));
            } else {
                dispatch(setAlert('Something went wrong!', 'error'));
            }
        }
    };
};

//create document
export const create_document = (data) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING })
        try {
            await axios.post(api_provider(CREATE_DOCUMENT), data);
            dispatch({ type: REMOVE_LOADING })
            //  get_documents({});
            dispatch(setAlert('Document Created Successfully!', 'success'));
            return true;
        } catch (err) {
            dispatch({ type: REMOVE_LOADING })
            if (err && err.response && err.response.data && err.response.data.message) {
                dispatch(setAlert(err.response.data.message, 'error'));
            } else {
                dispatch(setAlert('Something went wrong!', 'error'));
            }
            return false;
        }
    };
};

//delete document
export const delete_document = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING })
        try {
            await axios.delete(api_provider(`${DELETE_DOCUMENT}/${id}`));
            dispatch({ type: REMOVE_LOADING })
            dispatch(setAlert('Document Deleted Successfully!', 'success'));
            return true;
        } catch (err) {
            dispatch({ type: REMOVE_LOADING })
            if (err && err.response && err.response.data && err.response.data.message) {
                dispatch(setAlert(err.response.data.message, 'error'));
            } else {
                dispatch(setAlert('Something went wrong!', 'error'));
            }
            return false;
        }
    };
};