import RoleModel from './RoleModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);

const Role = RoleModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {

    const User = sequelize.define('user', {
        name: {
            type: type.STRING
        },
        phone: {
            type: type.INTEGER,
        },
        email: {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING
        },
        avatar: {
            type: type.STRING,
            defaultValue: 'https://battletime.s3.us-east-2.amazonaws.com/avatar/rapper-8.jpg'
        },
        state: {
            type: type.BOOLEAN,
            defaultValue: true
        },
    }, {
        paranoid: true,
        timestamps: true
    })

    User.belongsTo(Role, {
        foreignKey: {
            name: 'role_id'
        },
        references: {
            model: Role,
            key: 'id'
        }
    });

    return User

}