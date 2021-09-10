import http from "../http-common";

class ProductDataService {
  getAllProduct() {
    return http.get(`/products`);
  }
  getProductById(id: string) {
    return http.get(`/products/${id}`);
  }
  updateProduct(id: string, data: Object) {
    return http.put(`/products/${id}`, data);
  }
  deleteProduct(id: string) {
    return http.delete(`/products/${id}`);
  }
  postReview(productId: string, data: Object) {
    return http.post(`/products/${productId}`, data);
  }
  updateReview(productId: string, reviewId: string, data: Object) {
    return http.put(`products/${productId}/reviews/${reviewId}`, data);
  }
  deleteReview(productId: string, reviewId: string) {
    return http.delete(`products/${productId}/reviews/${reviewId}`);
  }
  addUser(data: Object) {
    return http.post("/user/register", data);
  }
  loginUser(data: Object) {
    return http.post("/user/login", data);
  }
  logoutUser() {
    return http.get("/user/logout");
  }
}

export default new ProductDataService();
