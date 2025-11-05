import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';

const addProductList = async (data,config) => {
    try {
        let result = await api.post(Apis. AddProductList ,data,config);
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

const addMultiProductList = async (data,config) => {
    try {
        let result = await api.post(Apis. AddMultiProductList ,data,config);
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


const getAllProductList = async () => {
    try {
        let result = await api.get(Apis.GetAllProductList);
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



const getUpdateProduct = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateProduct,data,config);
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

//update categorie

const getUpdateCategoryList = async (data,config) => {
    try {
        let result = await api.post(Apis.GetupdateCategoryList ,data,config);
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


const getDeleteProduct = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteProduct,{params: {id}});
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


const getAllProductPhoto = async () => {
    try {
        let result = await api.get(Apis.GetAllProductPhoto);
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


const getUploadProductImage = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUploadProductImage ,data,config);
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


const getUpdateImageList = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateImageList ,data,config);
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




const getProductDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetProductDeleteById,{params: {id}});
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



const getImageDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetImageDeleteById,{params: {id}});
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


const getUpdatehomevideo = async (data,config) => {
    try {
        let result = await api.post(Apis.GetupdateHomevideo ,data,config);
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


const getUpdateservice = async (data,config) => {
    try {
        let result = await api.post(Apis.GetupdateServices ,data,config);
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



const getUpdateservicevideo = async (data,config) => {
    try {
        let result = await api.post(Apis.GetupdateServicesvideo ,data,config);
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



const getUpdateBackground = async (data,config) => {
    try {
        let result = await api.post(Apis.Getupdatebackground ,data,config);
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
    addProductList,
    getAllProductList,
    getProductById,
    getDeleteProduct,
    getAllProductPhoto,
    getUploadProductImage,
   getUpdateProduct,
   addMultiProductList,
   getUpdateCategoryList,
   getProductDeleteById,
   getImageDeleteById,
   getUpdateImageList,

   getUpdatehomevideo,
   getUpdateBackground,
   getUpdateservice,
   getUpdateservicevideo,
   

   
};