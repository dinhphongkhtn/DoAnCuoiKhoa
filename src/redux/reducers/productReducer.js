import { GET_CATEGORY, GET_PRODUCT, GET_PRODUCT_BYCATE, GET_PRODUCT_BYFEATURE, GET_PRODUCT_BYID, GET_PRODUCT_PAGING } from "../actions/index";
import { CHANGE_FILTER, GET_FAVORITES, LIKE_PRODUCT, SET_PRODUCT_KEYWORD, UNLIKE_PRODUCT } from "../actions/product";

const initialState = {
    products: [],
    featuredProducts: [],
    keyword: '',
    favorites: [],
    searchedProducts: [],
    categories: []
}

export default (state = { ...initialState }, { type, payload }) => {

    switch (type) {

        case GET_PRODUCT:
            //  console.log(payload);
            state.products = payload;
            return { ...state }
        case GET_PRODUCT_BYFEATURE:
            // console.log(payload);
            state.featuredProducts = payload;
            return { ...state }
        case SET_PRODUCT_KEYWORD:
            console.log(payload);
            state.keyword = payload;
            return { ...state }
        case GET_FAVORITES:
            state.favorites = payload;
            return { ...state }
        case LIKE_PRODUCT:
            const f = state.favorites.find(a => a.id === payload.id);
            if (f === undefined) {
                state.favorites.push(payload);
                state.favorites = [...state.favorites];
            }
            //state.favorites = favorites;
            //state.favorites = payload;

            return { ...state }
        case UNLIKE_PRODUCT:

            const indexOfItem = state.favorites.findIndex(a => a.id === payload)
            state.favorites.splice(indexOfItem, 1);
            state.favorites = [...state.favorites];
            //state.favorites = newFavorites;
            // console.log( indexOfItem,state.favorites);
            //state.favorites = payload;
            return { ...state }
        case CHANGE_FILTER:
            state.searchedProducts = payload;
            return { ...state };
        case GET_CATEGORY:
            console.log(payload);
            state.categories = payload;
            return { ...state }
        default:
            return state
    }
}
