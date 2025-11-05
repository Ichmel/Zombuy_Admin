import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';


const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin,data );
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

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegister,data);
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

const getAllUserList = async () => {
    try {
        let result = await api.get(Apis.GetAllUserList);
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

const getUserUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetUserUpdate,data);
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

const getDeleteUserList = async (id) => {
    try {
        let result = await api.post(Apis.GetDeleteUserList,{
            id: id
        });
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

const authenticate = ( token , email, role ) => {
    if(typeof window !=="undefined"){
        sessionStorage.setItem('_sid', token)
       sessionStorage.setItem('email', email)
       sessionStorage.setItem('role', role)
        
    }
};


const logout = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('_sid');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');
        window.location.href = "/adminlogin";
        // next();
    }
};



const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sid');
};



export default {
    getUserLogin,
    getAllUserList,
    getUserUpdate,
    getDeleteUserList,
    authenticate,
    getUserRegister,
    logout,
    isAuthenticate
};