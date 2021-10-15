import API from "../axios";
import { Product, Review, InputUser, CartItems, Filter } from "../interface";
class ProductDataService {
  getAllProduct(page: string) {
    return API.get(`products?page=${page}`);
  }
  getProductById(id: string) {
    return API.get(`products/${id}`);
  }
  findProducts(filter: Filter) {
    return API.get(
      `products?${filter.query}=${filter.value}&page=${filter.page}`
    );
  }
  addProduct(data: Product) {
    return API.post(`/products`, data);
  }
  updateProduct(id: string, data: Product) {
    return API.put(`/products/${id}`, data);
  }
  deleteProduct(id: string) {
    return API.delete(`/products/${id}`);
  }
  getReviews(productId: string) {
    return API.get(`products/${productId}/reviews`);
  }
  postReview(productId: string, review: Review) {
    return API.post(`/products/${productId}`, review);
  }
  updateReview(productId: string, reviewId: string, review: Review) {
    return API.put(`products/${productId}/reviews/${reviewId}`, review);
  }
  deleteReview(productId: string, reviewId: string) {
    return API.delete(`products/${productId}/reviews/${reviewId}`);
  }
  checkoutCart(cartItems: CartItems) {
    return API.post(`/cart`, cartItems);
  }
  registerUser(user: InputUser) {
    return API.post("/user/register", user);
  }
  loginUser(user: InputUser) {
    return API.post("/user/login", user);
  }
  logoutUser() {
    return API.post("/user/logout");
  }
}

export default new ProductDataService();
