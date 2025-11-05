import api from '../../../ApiConfig';
import { Apis } from '../../../Config';
import { NotificationManager } from 'react-notifications';



/*........................Configuration de ajout, recuoeration et d uqdate  des differentes categories................................*/

const getMainCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetMainCategoryList);
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


const createMainCategoryList = async (data, config) => {
    try {
        let result = await api.post(Apis.CreateMainCategoryList, data, config);
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




/*........................Configuration de ajout, recuperation et d uqdate  des differentes Subcategories................................*/

const createSubCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.CreateSubCategoryList, {
            name: data.name, description: data.description, categoryId: data.categoryId
        })
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


const getSubCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetSubCategoryList);
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


const getUpdateSubCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.GetupdateSubCategoryList, data);
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



/*........................Configuration de filter enfin de liste les   des differentes  Subcategories  par categories................................*/

const getSubCatListById = async (id) => {
    try {
        let result = await api.get(Apis.GetSubCatListById + id);
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


const getChildCatListById = async (id) => {
    try {
        let result = await api.get(Apis.GetChildCatListById + id);
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

/*........................Configuration de ajout, recuoeration et d uqdate  des differentes Subcategories................................*/

const createChildCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.CreateChildCategoryList, data)
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



const getChildCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetChildCategoryList);
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




const getUpdateChildCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.UpdateChildCategoryList, data);
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






/*........................Configuration de ajout, recuoeration et d uqdate  de couleur et titre................................*/

const getcouleurList = async () => {
    try {
        let result = await api.get(Apis.GetCouleurList);
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


const createcouleurList = async (data) => {
    try {
        let result = await api.post(Apis.CreateCouleurList, data);
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



const getCouleurDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.DeleteCouleur, { params: { id } });
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


const getUpdatecouleurList = async (data) => {
    try {
        let result = await api.post(Apis.UpdateCouleur, data);
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




const getTitleList = async () => {
    try {
        let result = await api.get(Apis.GetTitleList);
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


const createtitleList = async (data) => {
    try {
        let result = await api.post(Apis.CreateTitleList, data);
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



const getTitleDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.DeleteTitle, { params: { id } });
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


const getUpdatetitleList = async (data) => {
    try {
        let result = await api.post(Apis.UpdateTitle, data);
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


//delete

const getSubDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetSubDeleteById, { params: { id } });
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


const getCatDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCatDeleteById, { params: { id } });
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



const getChildDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetChildDeleteById, { params: { id } });
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



/*........................Configuration de Update de productphoto................................*/

const getupdateproductphotoList = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateproductphoto, data);
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



const getupdateproductphotogrosList = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateproductphotoGros, data);
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




//*********************************Home video  ******************* */


const createhomepub = async (data, config) => {
    try {
        let result = await api.post(Apis.CreateVideoHomepage, data, config);
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


const getafficheVideohome = async () => {
    try {
        let result = await api.get(Apis.GetAfficheVideoHome);
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



const getDeletehomevideoById = async (id) => {
    try {
        let result = await api.delete(Apis.GethomevideoDeleteById, { params: { id } });
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


//******************************** Services  ******************* */

const createService = async (data, config) => {
    try {
        let result = await api.post(Apis.CreateServices, data, config);
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


const getafficheService = async () => {
    try {
        let result = await api.get(Apis.GetAfficheServices);
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



const getDeleteServiceById = async (id) => {
    try {
        let result = await api.delete(Apis.GetServicesDeleteById, { params: { id } });
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



//********************************* Service video  ******************* */



const createservicesvideo = async (data, config) => {
    try {
        let result = await api.post(Apis.CreateVideoServices, data, config);
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



const getVideoAffiche = async () => {
    try {
        let result = await api.get(Apis.GetAfficheServicesvideo);
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



const getDeleteservicevideoById = async (id) => {
    try {
        let result = await api.delete(Apis.GetVideoDeleteById, { params: { id } });
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



//background


const getbackgroundList = async () => {
    try {
        let result = await api.get(Apis.GetAffichebackground);
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


const createbackgroundList = async (data, config) => {
    try {
        let result = await api.post(Apis.Createbackground, data, config);
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


const getDeletebackgroundById = async (id) => {
    try {
        let result = await api.delete(Apis.GetBackgroundDeleteById, { params: { id } });
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





const getlocalList = async () => {
    try {
        let result = await api.get(Apis.GetLocalList);
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


const createtlocalList = async (data) => {
    try {
        let result = await api.post(Apis.CreateLocalList, data);
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



const getlocalDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.DeleteLocal, { params: { id } });
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


const getUpdatelocalList = async (data) => {
    try {
        let result = await api.post(Apis.UpdateLocal, data);
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
    getMainCategoryList,
    createMainCategoryList,
    createSubCategoryList,
    getSubCategoryList,
    getUpdateSubCategoryList,
    getSubCatListById,
    createChildCategoryList,
    getChildCategoryList,
    getChildCatListById,
    getUpdateChildCategoryList,
    getSubDeleteById,
    getCatDeleteById,
    getChildDeleteById,

    getupdateproductphotoList,
    getupdateproductphotogrosList,

    createhomepub,
    getafficheVideohome,
    getDeletehomevideoById,

    createcouleurList,
    getcouleurList,
    getUpdatecouleurList,
    getCouleurDeleteById,

    createtitleList,
    getTitleList,
    getUpdatetitleList,
    getTitleDeleteById,

    getDeleteServiceById,
    getafficheService,
    createService,

    createservicesvideo,
    getDeleteservicevideoById,
    getVideoAffiche ,

    

    createbackgroundList,
    getbackgroundList,
    getDeletebackgroundById ,

    createtlocalList,
    getlocalList,
    getUpdatelocalList,
    getlocalDeleteById,
    
}