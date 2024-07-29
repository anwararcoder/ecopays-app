export const getCategoriesIds = (ids) => {
    return ids.map(val => 'category[in][]=' + val).join("&");
}
export const getSubCategoriesIds = (ids) => {
    return ids.map(val => 'subcategory[in][]=' + val).join("&");
}
export const getBrandsIds = (ids) => {
    return ids.map(val => 'brand[in][]=' + val).join("&");
}
// To get sub-categories for a specific category
export const getSubCategories = (subCategoriesArray, categoryId) => {
    return subCategoriesArray?.filter(subCategory => subCategory.category === categoryId) || [];
};