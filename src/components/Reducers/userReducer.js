export const userReducer = (state,action)=>{  
    return {...state,[action.type]:action.value};    
}