import Api from '../index';
import { endPoints, requestType } from '../../constants/variables';

// get products
export const getResturantProfile = (id) => {
    return Api(
        `${endPoints.getResturantProfile}/${id}`,
        null,
        requestType.GET,
    );
}

export const editResturantProfile = (id,params)=>{
    return Api(
        `${endPoints.editResturantProfile}/${id}`,
        params,
        requestType.PUT,
    );
}