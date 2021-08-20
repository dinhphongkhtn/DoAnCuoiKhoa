export const getProductsSelector = (state) => state.productReducer.products
export const getFeaturedProductsSelector = (state) => state.productReducer.featuredProducts;
export const getKeywordSelector = (state)=>state.productReducer.keyword;
export const getFavoriteSelector =(state) =>state.productReducer.favorites;
export const getSearchingProductSelector = (state)=>state.productReducer.searchedProducts;
export const getAllCategoriesSelector = (state) => state.productReducer.categories;