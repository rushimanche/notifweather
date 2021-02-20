import http from "../http-common";

class WeatherService {
  getWeather(data) {
    return http.post("/check", data);
  }
  createUser(data) {
    return http.post("/users", data);
  }
  userLogin(data) {
    return http.post("/auth", data);
  }
  loginRedirect(data) {
    return http.post("/home", data);
  } 
  updateUser(data) {
    return http.post("/update", data);
  } 
  subscribeNotifications(data) {
    return http.post("/subscribe", data);
  }
  verifyCity(data) {
    return http.post("/verifyCity", data);
  }
}

export default new WeatherService();