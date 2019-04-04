export const getJwt = () => {
    return sessionStorage.getItem('jwt');
}