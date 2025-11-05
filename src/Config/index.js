const API_URL =  "http://localhost:4001";

const Apis = {

  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/rootLogin`,
  GetUserRegister: `${API_URL}/api/auth/register`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,

  //Msg customer 
  GetAllProdList: `${API_URL}/api/customer/prodList?email=`,
  GetAllMsgCust: `${API_URL}/api/customer/msgcust?email=`,
  GetAllAdminMsg: `${API_URL}/api/customer/msgadmin?email=`,
  CreateAdminMsg: `${API_URL}/api/customer/adminmsg`,
 


  
  GetCustomerDeletById: `${API_URL}/api/customer/delete`,
  GetAllCustomerList: `${API_URL}/api/customer/list`,
  GetAllCustomerMsgList: `${API_URL}/api/customer/listClientmsg`,
  GetCustomerById : `${API_URL}/api/customer/getProductById`,
  


  /*........................API  des differentes categories................................*/

  GetMainCategoryList: `${API_URL}/api/category/main/list`,
  CreateMainCategoryList: `${API_URL}/api/category/create`,

  //Video home pub api
  CreateVideoHomepage: `${API_URL}/api/category/createvideopub`,
  GetAfficheVideoHome: `${API_URL}/api/category/affichevideopub`,
  GetupdateHomevideo: `${API_URL}/api/product/updatehomevideo`,
  GethomevideoDeleteById: `${API_URL}/api/category/deletehomeId`,


  /*........................API  des differentes Subcategories................................*/

  CreateSubCategoryList: `${API_URL}/api/category/sub-category/create`,
  GetSubCategoryList: `${API_URL}/api/category/sub-category/list`,
  GetupdateSubCategoryList: `${API_URL}/api/category/sub-cat/update`,
  GetSubCatListById: `${API_URL}/api/category/sub-list?categoryId=`,

  /*........................API  des differentes ChilSubcategories................................*/

  CreateChildCategoryList: `${API_URL}/api/category/child-category/create`,
  GetChildCategoryList: `${API_URL}/api/category/child-category/list`,
  UpdateChildCategoryList: `${API_URL}/api/category/child-category/update`,
  GetChildCatListById: `${API_URL}/api/category/child-list?subCatId=`,

  /*........................API  du produits................................*/

  AddProductList: `${API_URL}/api/product/produitdetail`,
  AddMultiProductList: `${API_URL}/api/product/addcreate`,
  GetAllProductList: `${API_URL}/api/product/getAllproduct`,
  GetAllProductPhoto: `${API_URL}/api/product/getAllPhoto`,
  GetUploadProductImage: `${API_URL}/api/product/upload`,
  GetUpdateProduct: `${API_URL}/api/product/update`,
  GetProductById: `${API_URL}/api/product/getProductById`,


  //update Categorie
  GetupdateCategoryList: `${API_URL}/api/product/main/update`,

  /*........................API  du  Update productphoto ................................*/
  GetUpdateImageList: `${API_URL}/api/product/updatephoto`,



  GetUpdateproductphoto: `${API_URL}/api/category/photoupdate`,

  /*........................API  du  Order ................................*/
  GetAdressList: `${API_URL}/api/order/addressList`,
  GetCartList: `${API_URL}/api/order/cartList`,


  /*........................API  du  delete category ................................*/
  GetChildDeleteById: `${API_URL}/api/category/child/deletechildId`,
  GetCatDeleteById: `${API_URL}/api/category/cat/deletecatId`,
  GetSubDeleteById: `${API_URL}/api/category/sub/deletesubId`,


  /*........................API  du  delete Product ................................*/
  GetProductDeleteById: `${API_URL}/api/category/deleteproductId`,
  GetImageDeleteById: `${API_URL}/api/category/deleteimageId`,


  /*........................API  du produits Gros................................*/

  AddProductListGros: `${API_URL}/api/productgros/create`,
  AddMultiProductListGros: `${API_URL}/api/productgros/addcreate`,
  GetAllProductListGros: `${API_URL}/api/productgros/getAllproduct`,
  GetAllProductPhotoGros: `${API_URL}/api/productgros/getAllPhoto`,
  GetUploadProductImageGros: `${API_URL}/api/productgros/upload`,
  GetUpdateProductGros: `${API_URL}/api/productgros/update`,
  GetProductGrosById: `${API_URL}/api/productgros/getProductById`,


  GetUpdateproductphotoGros: `${API_URL}/api/category/photogrosupdate`,


  /*........................API  du  delete Product ................................*/
  GetProductDeleteByIdGros: `${API_URL}/api/category/deleteproductgrosId`,
  GetImageDeleteByIdGros: `${API_URL}/api/category/deleteimagegrosId`,



  GetupdateCategoryListGros: `${API_URL}/api/productgros/main/update`,


  //post

  CreateCouleurList: `${API_URL}/api/category/createcouleur`,
  CreateTitleList: `${API_URL}/api/category/createtitle`,
  CreateLocalList: `${API_URL}/api/category/createlocal`,

  //list
  GetCouleurList: `${API_URL}/api/category/affichecouleur`,
  GetTitleList: `${API_URL}/api/category/affichetitle`,
  GetLocalList: `${API_URL}/api/category/affichelocal`,

  //Update
  UpdateCouleur: `${API_URL}/api/category/updatecouleur`,
  UpdateTitle: `${API_URL}/api/category/updatetitle`,
  UpdateLocal: `${API_URL}/api/category/updatelocal`,


  //Update
  DeleteCouleur: `${API_URL}/api/category/deletecouleurId`,
  DeleteTitle: `${API_URL}/api/category/deletetitleId`,
  DeleteLocal: `${API_URL}/api/category/deletelocalId`,


  //Services api
  CreateServices: `${API_URL}/api/category/createservices`,
  GetAfficheServices: `${API_URL}/api/category/afficheservices`,
  GetupdateServices: `${API_URL}/api/product/updateservice `,
  GetServicesDeleteById: `${API_URL}/api/category/deleteservicesId`,

  CreateVideoServices: `${API_URL}/api/category/videoservices`,
  GetAfficheServicesvideo: `${API_URL}/api/category/affichevideoservices`,
  GetupdateServicesvideo: `${API_URL}/api/product/updatevideoservice `,
  GetVideoDeleteById: `${API_URL}/api/category/deletevideoservicesId`,



  //Background api
  Createbackground: `${API_URL}/api/category/createbackground`,
  GetAffichebackground: `${API_URL}/api/category/affichebackground`,
  Getupdatebackground: `${API_URL}/api/product/updatebackground`,
  GetBackgroundDeleteById: `${API_URL}/api/category/deletebackground`,

//Commercial  APi

GetCommercialDeletedById : `${API_URL}/api/commercial/delete`,
GetCommercialListe: `${API_URL}/api/commercial/listecom`,
GetCommercialDetailsRemise: `${API_URL}/api/commercial/getByAll?codeBonnus=`,
GetCommercialDetailscomm: `${API_URL}/api/commercial/getByRemise?codeBonnus=`,
GetCommercialUpadeCom : `${API_URL}/api/order/updatecommission`,
GetCommercialById: `${API_URL}/api/commercial/getProductById`,

  
  //Dashboard
  GetOrderProductListById: `${API_URL}/api/order/orderByid?id=`,

  GetOrderByStatus: `${API_URL}/api/order/status`,
  GetAllStatusOrder: `${API_URL}/api/order/count`,

  GetAllOrderList: `${API_URL}/api/order/orderlist`,
  GetAllOrderDetetails: `${API_URL}/api/order/liste`,
  GetOrderStatusUpdate: `${API_URL}/api/order/status/update`,


  //cart
  GetAllCart: `${API_URL}/api/order/Listcart`,
  GetDeletecart: `${API_URL}/api/order/deletecartId`,
 

};
export { API_URL, Apis };
