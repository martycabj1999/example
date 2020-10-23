import jwtDecode from 'jwt-decode'

export const getUserHelp = () => {
    let token = localStorage.getItem("token-test");

    if (token) {
        const tokenDecoded = jwtDecode(token)
        return tokenDecoded
    }
    return {}

}

