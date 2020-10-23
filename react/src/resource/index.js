import AuthProvider from '../modules/user/auth/provider/AuthProvider'
import RegisterUserProvider from "../modules/user/register/provider/provider";
// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth')
export const RegisterService = new RegisterUserProvider('register')
