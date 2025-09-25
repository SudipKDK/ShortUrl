const sessionIdToUserMap =new Map();

export const setUser =(id,user)=>{
    sessionIdToUserMap.set(id,user);
}
export const getUser =(id)=>{
    return sessionIdToUserMap.get(id)
}