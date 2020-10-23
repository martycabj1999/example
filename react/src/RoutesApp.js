import React from 'react'
import Register from "./modules/user/register/pages/Register";
import ResetPass from './modules/user/recovery/pages/Resetpass';
import Profile from './modules/user/profile/pages/Profile';
import Home from './modules/layout/pages/Home';
import Auth from './modules/user/auth/pages/Auth';
import Unauthorized from "./modules/layout/components/Unauthorized";
import PanelAdmin from './modules/user/admin/pages/PanelAdmin';
//icons
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';
import UserManagementIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import AuthIcon from '@material-ui/icons/VpnKeyTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import RegisterIcon from '@material-ui/icons/FaceTwoTone';
import ResetIcon from '@material-ui/icons/RotateLeftTwoTone';
import NotAutorizeIcon from '@material-ui/icons/HighlightOffTwoTone';

export const routesPublic = [
    {
        name: "Home",
        path: '/home',
        component: Home,
        menuList: true,
        icon: <HomeIcon />
    },
    {
        name: "Authentication",
        path: '/auth',
        component: Auth,
        menuList: false,
        icon: <AuthIcon />,
    },
    {
        name: "Logout",
        path: '/logout',
        component: Auth,
        menuList: false,
        icon: <ExitToAppTwoToneIcon />,
    },
    {
        name: "Register",
        path: '/register',
        component: Register,
        menuList: false,
        icon: <RegisterIcon />,
    },
    {
        name: "Reset Password",
        path: '/reset-pass',
        component: ResetPass,
        menuList: false,
        icon: <ResetIcon />,
    },
    {
        name: "UnAuthorized",
        path: '/unauthorized',
        component: Unauthorized,
        menuList: false,
        icon: <NotAutorizeIcon />,
    }
];
export const routesPrivate = [
    {
        name: "Profile",
        path: '/profile',
        component: Profile,
        roles: ['admin', 'user'],
        menuList: true,
        icon: <ProfileIcon />,
    },
    {
        name: "User Management",
        path: '/panel-admin',
        component: PanelAdmin,
        roles: ['admin', 'user'],
        menuList: true,
        icon: <UserManagementIcon />,
    }
];