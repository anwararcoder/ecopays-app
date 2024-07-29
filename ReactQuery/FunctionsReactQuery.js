import { storage } from "@/Utilities/LocalStorage/localStorageContainer";
import axios from "axios";
const TOKEN_AUTH = storage.get("DataUser")?.token;
export const API = axios.create({
  baseURL: process.env.BASE_URL,
});
API.defaults.headers.common["Authorization"] = `Bearer ${TOKEN_AUTH}`;
// :: => AUTH
export async function loginUser(user) {
  const response = await API.post("/api/v1/auth/login", user);
  return response.data;
}
export async function signUpUser(newUser) {
  const response = await API.post("/api/v1/auth/signup", newUser);
  return response.data;
}
export async function forgotPasswords(email) {
  const response = await API.post("/api/v1/auth/forgotPasswords", email);
  return response.data;
}
export async function verifyResetCode(code) {
  const response = await API.post("/api/v1/auth/verifyResetCode", code);
  return response.data;
}
export async function resetPassword(newPassword) {
  const response = await API.put("/api/v1/auth/resetPassword", newPassword);
  return response.data;
}

// :: => Categories
export async function getAllCategories() {
  const response = await API.get("/api/v1/categories");
  return response.data;
}
export async function getCategoryById(categoryId) {
  const response = await API.get(`/api/v1/categories/${categoryId}`);
  return response.data;
}
export async function deleteCategory(categoryId) {
  const response = await API.delete(`/api/v1/categories/${categoryId}`);
  return response.data;
}
export async function getAllSubCategories() {
  const response = await API.get("/api/v1/subcategories");
  return response.data;
}
export async function getSubCategoryById(subCategoryId) {
  const response = await API.get(`/api/v1/subcategories/${subCategoryId}`);
  return response.data;
}

// :: => Products
export async function getAllProducts(
  limit,
  categoriesIds,
  subCategoriesIds,
  brandsIds,
  keyword,
  priceFrom,
  priceTo,
  sort,
  page
) {
  const response = await API.get(
    `/api/v1/products?limit=${limit}${
      categoriesIds ? `&${categoriesIds}` : ""
    }${subCategoriesIds ? `&${subCategoriesIds}` : ""}${
      brandsIds ? `&${brandsIds}` : ""
    }${keyword ? `&keyword=${keyword}` : ""}${
      priceFrom ? `&price[gte]=${priceFrom}` : ""
    }${priceTo ? `&price[lte]=${priceTo}` : ""}${sort ? `&sort=${sort}` : ""}${
      page ? `&page=${page}` : ""
    }`
  );
  return response.data;
}
export async function getProductById(productId) {
  const response = await API.get(`/api/v1/products/${productId}`);
  return response.data;
}

// :: => Cart & Wishlist
export async function getCart() {
  const response = await API.get(`/api/v1/cart`);
  return response.data;
}
export async function updateCartProductQuantity(cartId, count) {
  const response = await API.put(`/api/v1/cart/${cartId}`, { count });
  return response.data;
}
export async function removeFromCart(cartId) {
  const response = await API.delete(`/api/v1/cart/${cartId}`);
  return response.data;
}
export async function clearCart() {
  const response = await API.delete(`/api/v1/cart`);
  return response.data;
}
export async function getWishlist() {
  const response = await API.get(`/api/v1/wishlist`);
  return response.data;
}
export async function addToWishlist(productId) {
  const response = await API.post("/api/v1/wishlist", productId);
  return response.data;
}
export async function removeFromWishlist(productId) {
  const response = await API.delete(`/api/v1/wishlist/${productId}`);
  return response.data;
}
export async function addToCart({ productId, color }) {
  const response = await API.post("/api/v1/cart", { productId, color });
  return response.data;
}

// :: => Review
export async function addWriteReview(newReview) {
  const response = await API.post("/api/v1/reviews", newReview);
  return response.data;
}

// :: => Brands
export async function getAllBrands() {
  const response = await API.get("/api/v1/brands");
  return response.data;
}

// :: => Coupon
export async function applyCouponToCart({ couponName }) {
  const response = await API.put("/api/v1/cart/applyCoupon", { couponName });
  return response.data;
}

// :: => Orders
export async function getAllOrders(limit, page) {
  const response = await API.get(
    `/api/v1/orders?limit=${limit}${page ? `&page=${page}` : ""}`
  );
  return response.data;
}
export async function getOrderById(orderId) {
  const response = await API.get(`/api/v1/orders/${orderId}`);
  return response.data;
}
export async function createCashOrder(cartId, address) {
  const response = await API.post(`/api/v1/orders/${cartId}`, {
    shippingAddress: address,
  });
  return response.data;
}

export async function createViaCreditOrder(cartId, address) {
  const response = await API.get(`/api/v1/orders/checkout-session/${cartId}`, {
    shippingAddress: address,
  });
  return response.data;
}

// :: => User
export async function getUserDetails() {
  const response = await API.get("/api/v1/users/getMe");
  return response.data;
}
export async function updateUserDetails(newDetails) {
  const response = await API.put("/api/v1/users/updateMe", newDetails);
  return response.data;
}
export async function changeUserPassword(newPassword) {
  const response = await API.put("/api/v1/users/changeMyPassword", newPassword);
  return response.data;
}

// :: => Addresses
export async function getAllAddresses() {
  const response = await API.get("/api/v1/addresses");
  return response.data;
}
export async function deleteAddress(addressId) {
  const response = await API.delete(`/api/v1/addresses/${addressId}`);
  return response.data;
}
export async function getAddressById(addressId) {
  const response = await API.get(`/api/v1/addresses/${addressId}`);
  return response.data;
}
export async function updateAddressDetails(addressId, newAddress) {
  const response = await API.put(`/api/v1/addresses/${addressId}`, newAddress);
  return response.data;
}