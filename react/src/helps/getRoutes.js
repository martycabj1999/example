import {routesPublic, routesPrivate} from '../RoutesApp';
import {getUserHelp} from './getUser';

export const getRoutes = () => {
    
    let routesPublics = routesPublic.filter(elem => 
        elem.menuList === true)
    let user = getUserHelp();
    if(JSON.stringify(user)==='{}'){
            return routesPublics
    }
    else{
        let routesPrivates = routesPrivate.filter(elem => 
            elem.roles.find(found => found === user.role.name)
        );
        return routesPublics.concat(routesPrivates)
    }
}