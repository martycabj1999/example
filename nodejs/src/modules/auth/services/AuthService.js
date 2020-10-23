import Sequelize from 'sequelize';
import UserModel from "../models/UserModel";
import RoleModel from "../models/RoleModel";
import bcryptjs from 'bcryptjs'
import jsonwebtoken from "jsonwebtoken";
import {
    JWT_SECRET,
    DBURL
} from '../../../../config';
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

function generateToken(user, roleName) {
    let token = jsonwebtoken.sign({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: {
            name: roleName
        },
        avatar: user.avatar
    },
        JWT_SECRET, {
        expiresIn: '10d'
    }
    )
    return token
}

/**
 * auth user
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
export const authService = async function (email, password) {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        }).then(async ({
            dataValues
        }) => {

            if (dataValues.state === 0) {
                return {
                    status: false,
                    msg: 'Disabled user'
                };
            }

            const validPassword = bcryptjs.compareSync(password, dataValues.password)

            if (!validPassword) {
                return {
                    status: false,
                    msg: 'The email or password is invalid'
                };
            }

            const role = await Role.findByPk(dataValues.role_id).then(({
                dataValues
            }) => (dataValues))

            const token = generateToken(dataValues, role.name)

            return token

        })

        return user
    } catch (error) {
        logError('authService', error)
        throw (MessageResponse.serviceCatch(error))
    }

}