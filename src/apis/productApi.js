import axios from 'axios';

export const getProduct = (keyword) =>{
  return axios({
    url: `http://svcy3.myclass.vn/api/Product?keyword=${keyword}`,
    method: 'GET',
    
  });
};

export const getProductByCategory = (CateId) => {
    return axios({
      url: `http://svcy3.myclass.vn//api/Product/getProductByCategory`,
      method: 'GET',
      
      params:{categoryId:CateId}
    });
  };

  export const getProductByFeature = (CateId) => {
    return axios({
      url: `http://svcy3.myclass.vn/api/Product/getProductByFeature?feature=${CateId}`,
      method: 'GET',
      // headers: {'Authorization': 'Bearer '+data}
    });
  };

  export const getProductById = (id) => {
    return axios({
      url: `http://svcy3.myclass.vn//api/Product/getbyid?id=${id}`,
      method: 'GET',
      
    });
  };

  export const likeProductApi = (id, token) => {
    
    return axios({
      url: `http://svcy3.myclass.vn/api/Users/like?productId=${id}`,
      method: 'GET',
      headers: {'Authorization': 'Bearer '+token}
    });
  };

  export const unlikeProductApi = (id, token) => {
    
    return axios({
      url: `http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`,
      method: 'GET',
      headers: {'Authorization': 'Bearer '+token}
    });
  };

  
  export const getFavorite = token => {
    
    return axios({
      url: `http://svcy3.myclass.vn/api/Users/getproductfavorite`,
      method: 'GET',
      headers: {'Authorization': 'Bearer '+token}
    });
  };

  
  export const getAllCategory = (keyword)=>{
    return axios({
      url: `http://svcy3.myclass.vn/api/Product/getAllCategory`,
      method: 'GET',
     params:{keyword: keyword}
    });
  }