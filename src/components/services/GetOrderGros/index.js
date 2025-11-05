import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';


const getAdressList = async () => {
    try {
        let result = await api.get(Apis.GetAdressList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
         console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const getcartlist = async () => {
    try {
        let result = await api.get(Apis.GetCartList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAllOrderList = async () => {
    try {
        let result = await api.get(Apis.GetAllOrderDetails);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getOrderStatusUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderStatusUpdate,data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default {
    getAllOrderList,
    getOrderStatusUpdate,
    getAdressList,
    getcartlist
};