export function setAvatarAction(avatar){
    return (dispatch) => {
        dispatch({
            type: 'SET_AVATAR',
            payload: avatar
        })
    }
}
