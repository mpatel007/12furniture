export const setLogin = (status)=>{
    return {type:"isLoggedIn",value:status}
}
export const setIsAdmin = (status)=>{
    return {type:"isAdmin",value:status}
}

export const setData = (data)=>{
    return {type:"data",value:data}
}
// export const setData = (data)=>{
//     return {type:"data",value:data}
// }
export const setCartCount = (data)=>{
    return {type:"cartCount",value:data}
}