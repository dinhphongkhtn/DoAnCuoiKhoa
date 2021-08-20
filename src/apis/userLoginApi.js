import axios from 'axios';

export const userSignUp = data => {
  return axios({
    url: 'http://svcy3.myclass.vn/api/Users/signup',
    method: 'POST',
    data,
  });
};

export const userLogin = data =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/signin',
    method: 'POST',
    data,
  });

export const getUserProfile = data =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/getProfile',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + data }
  });

export const uploadAvatarApi = (data, token) =>
  axios({
    url: 'http://svcy3.myclass.vn//api/Users/uploadavatar',
    method: 'POST',
    body: data,
    headers: { 'Authorization': 'Bearer ' + token }
  });
  export const uploadUserProfile = (data, token) =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/updateProfile',
    method: 'POST',
    data,
    headers: { 'Authorization': 'Bearer ' + token }
  });
