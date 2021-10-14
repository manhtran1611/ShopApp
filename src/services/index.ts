import API from "../axios";
import {
  Product,
  Review,
  InputUser,
  CartItems,
  OutputUser,
} from "../interface";
class ProductDataService {
  getAllProduct(page: number = 0) {
    return API.get(`products?page=${page}`);
  }
  getProductById(id: string) {
    return API.get(`products/${id}`);
  }
  findProduct(query: string, by: string, page = 0) {
    return API.get(`/products?${by}=${query}&page=${page}`);
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
  logoutUser(user: OutputUser) {
    return API.post("/user/logout", user);
  }
}

export default new ProductDataService();
