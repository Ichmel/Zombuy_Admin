import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';



const getProductById = async (id) => {
    try {
        let result = await api.get(Apis.GetProductById,{params: {id}});
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



const getCustomerById = async (id) => {
    try {
        let result = await api.get(Apis.GetCustomerById ,{params: {id}});
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

const getAllCustomerList = async () => {
    try {
        let result = await api.get(Apis.GetAllCustomerList ) ;
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



const getAllCustomerMsgList = async () => {
    try {
        let result = await api.get(Apis.GetAllCustomerMsgList ) ;
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

const getCustomerDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCustomerDeletById,{params: {id}});
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


const getProduiList = async (email) => {
    try {
        let result = await api.get(Apis.GetAllProdList + email);
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


const getMessageCustList = async (email) => {
    try {
        let result = await api.get(Apis.GetAllMsgCust + email);
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


const getMessageAdminList = async (email) => {
    try {
        let result = await api.get(Apis.GetAllAdminMsg + email);
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

const createmsgList = async (data) => {
    try {
        let result = await api.post(Apis.CreateAdminMsg, data);
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


export default {
    getAllCustomerList,
    getCustomerDeleteById,
    getMessageCustList,
    getMessageAdminList,
    getProduiList,
    createmsgList,
    getAllCustomerMsgList,
    getProductById,
    getCustomerById 
};