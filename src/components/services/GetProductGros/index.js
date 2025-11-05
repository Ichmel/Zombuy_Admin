import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';




const getProductgrosById = async (id) => {
    try {
        let result = await api.get(Apis.GetProductGrosById,{params: {id}});
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


const addProductList = async (data,config) => {
    try {
        let result = await api.post(Apis.AddProductListGros ,data,config);
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
        let result = await api.post(Apis.AddMultiProductListGros ,data,config);
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
        let result = await api.get(Apis.GetAllProductListGros);
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
        let result = await api.post(Apis.GetUpdateProductGros,data,config);
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
        let result = await api.post(Apis.GetupdateCategoryListGros ,data,config);
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
        let result = await api.get(Apis.GetAllProductPhotoGros);
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
        let result = await api.post(Apis.GetUploadProductImageGros ,data,config);
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
        let result = await api.post(Apis.GetUpdateImageListGros ,data,config);
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
        let result = await api.delete(Apis.GetProductDeleteByIdGros,{params: {id}});
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
        let result = await api.delete(Apis.GetImageDeleteByIdGros,{params: {id}});
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
    getProductgrosById,
    getAllProductPhoto,
    getUploadProductImage,
   getUpdateProduct,
   addMultiProductList,
   getUpdateCategoryList,
   getProductDeleteById,
   getImageDeleteById,
   getUpdateImageList,
   
   
};