import { setData, setLogin, setIsAdmin,setCartCount } from "../Action/UserAction";


const useUser = (user, userdispatch) => {
    return {
        isLoggedIn: user.isLoggedIn,
        data: user.data,
        isAdmin: user.isAdmin,
        cartCount:user.cartCount,
        setUserData: (data) => {
            userdispatch(setData(data));
        },
        setLogin: (loginStatus) => {
            userdispatch(setLogin(loginStatus));
        },
        setIsAdmin: (loginStatus) => {
            userdispatch(setIsAdmin(loginStatus));
        },
        setCartCount: (count) => {
            userdispatch(setCartCount(count));
        },
        logout: () => {
            localStorage.clear();
            userdispatch(setLogin(false));
            userdispatch(setIsAdmin(false));
            userdispatch(setData({}));
            userdispatch(setCartCount(0));

        },
    }
}
export default useUser;