//Inicializamos el usuario a partir del token guardado en LocalStorage
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem("token-test");
const userDecoded = token ? jwtDecode(token) : {}

//cada reducer tiene su propio state
const initialState = {
    user: userDecoded ? userDecoded : {},
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'SET_AUTH':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
