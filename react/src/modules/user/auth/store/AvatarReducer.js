const avatarImg = localStorage.getItem("avatar-test");

//cada reducer tiene su propio state
const initialState = {
    avatar: avatarImg ? avatarImg : {},
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'SET_AVATAR':
            return {
                ...state,
                avatar: action.payload
            }
        default:
            return state;
    }
}