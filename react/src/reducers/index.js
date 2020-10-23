import { combineReducers } from 'redux';
import AuthReducer from '../modules/user/auth/store/AuthReducer';
import AvatarReducer from '../modules/user/auth/store/AvatarReducer'

export default combineReducers({
    security: AuthReducer,
    avatar: AvatarReducer,
})