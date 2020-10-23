import Sequelize from 'sequelize';

//AUTH
import UserModel from '../src/modules/auth/models/UserModel'
import RoleModel from '../src/modules/auth/models/RoleModel'

import {
    DBURL
} from './index'
import {
    logger
} from '../src/modules/logger/logger';

import bcryptjs from "bcryptjs";

const sequelize = new Sequelize(DBURL);

//AUTH
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

sequelize.sync()
    .then(async () => {
        logger.info('Connection with MySql through Sequelize')
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync('123123', salt);

        await Role.create({
            name: 'admin',
        });
        await Role.create({
            name: 'user',
        });

        await User.create({
            name: 'Admin',
            email: 'admin@gmail.com',
            phone: 113483921,
            password: hashPassword,
            role_id: 1,
            state: 1,
        });
    })

export default sequelize