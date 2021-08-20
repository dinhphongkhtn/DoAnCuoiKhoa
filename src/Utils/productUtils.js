import { acc } from "react-native-reanimated";
import { likeProductApi, unlikeProductApi } from "../apis/productApi"
import {getAccessToken} from "./storage.js"

export const  likeProductUtil= async (productId) =>  {

    const accessToken = await getAccessToken();
// console.log("likeProductUtil" + accessToken);
    const result = await likeProductApi(productId,accessToken)
    return result;
}

export const  unlikeProductUtil= async (productId) =>  {

    const accessToken = await getAccessToken();
// console.log("likeProductUtil" + accessToken);
    const result = await unlikeProductApi(productId,accessToken)
    return result;
}