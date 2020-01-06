import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const getSession = () => {
  const jwt = Cookies.get("userToken");
  let session;
  try {
    if (jwt) {
      session = jwt_decode(jwt);
    }
  } catch (error) {
    console.log(error);
  }
  return session;
};

export const logOut = () => {
  Cookies.remove("userToken");
  window.location.replace("/");
};
