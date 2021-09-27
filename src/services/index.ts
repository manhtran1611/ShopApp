import http from "../axios";
import { Product, Review, User } from "../interface";
class ProductDataService {
  getAllProduct(page: number = 0) {
    return http.get(`products?page=${page}`);
  }
  getProductById(id: string) {
    return http.get(`products/${id}`);
  }
  findProduct(query: string, by: string, page = 0) {
    return http.get(`/products?${by}=${query}&page=${page}`);
  }
  addProduct(data: Product) {
    return http.post(`/products`, data);
  }
  updateProduct(id: string, data: Product) {
    return http.put(`/products/${id}`, data);
  }
  deleteProduct(id: string) {
    return http.delete(`/products/${id}`);
  }
  postReview(productId: string, review: Review) {
    return http.post(`/products/${productId}`, review);
  }
  updateReview(productId: string, reviewId: string, review: Review) {
    return http.put(`products/${productId}/reviews/${reviewId}`, review);
  }
  deleteReview(productId: string, reviewId: string) {
    return http.delete(`products/${productId}/reviews/${reviewId}`);
  }
  addUser(user: User) {
    return http.post("/user/register", user);
  }
  loginUser(user: User) {
    return http.post("/user/login", user);
  }
  logoutUser() {
    return http.get("/user/logout");
  }
}

export default new ProductDataService();
