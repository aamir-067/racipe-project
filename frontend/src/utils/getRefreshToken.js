import Cookies from "js-cookie"

export const getRefreshToken = () => {
    const token1 = Cookies.get("refreshToken");
    const token2 = localStorage.getItem("refreshToken");
    const refreshToken = (token1 || token2) ? token1 : "";
    return refreshToken;
}