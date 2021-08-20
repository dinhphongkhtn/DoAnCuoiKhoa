import axios from "axios";


export const orderApi = data =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/order',
    method: 'POST',
    data,
  });
