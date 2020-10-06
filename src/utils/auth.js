import Cookies from "js-cookie";

const TokenKey = 'loginToken';

export function getToken() {
    var test = Cookies.get(TokenKey);
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
  
export function removeToken() {
    return Cookies.remove(TokenKey)
}