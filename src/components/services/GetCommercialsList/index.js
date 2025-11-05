import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';



const getProductById = async (id) => {
    try {
        let result = await api.get(Apis.GetCommercialById ,{params: {id}});
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


const getAllCommercialList = async () => {
    try {
        let result = await api.get(Apis.GetCommercialListe ) ;
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


const getCommercialDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCommercialDeletedById,{params: {id}});
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



const getPrimeListeAll = async (codeBonnus) => {
    try {
        let result = await api.get(Apis.GetCommercialDetailsRemise + codeBonnus);
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



const getPrimeListecommission = async (codeBonnus) => {
    try {
        let result = await api.get(Apis.GetCommercialDetailscomm + codeBonnus);
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


const getCommissionUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCommercialUpadeCom ,data);
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
    getCommercialDeleteById,
    getAllCommercialList,
    getPrimeListeAll,
    getCommissionUpdate,
    getPrimeListecommission,
    getProductById
    
};