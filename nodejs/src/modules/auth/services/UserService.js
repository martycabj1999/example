import { Sequelize } from "sequelize";
import UserModel from "../models/UserModel";
import RoleModel from "../models/RoleModel";
import {
    DBURL
} from "../../../../config";
import bcryptjs from "bcryptjs";
import InvalidPasswordError from "../errors/InvalidPasswordError"
import {
    MessageResponse
} from "../../../helpers/messageResponse"
import {
    logError
} from '../../logger/logger'

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

/**
 * get Users
 *
 * @export
 * @returns {Object}
 */
export async function readUsers() {
    try {
        let users = await User.findAll();
        if (!users) {
            throw MessageResponse.notFound();
        }
        return users;
    } catch (error) {
        logError('readUsers', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * Update password
 *
 * @export
 * @param {number} id
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Object}
 */
export async function updatePasswordUser(id, currentPassword, newPassword) {
    try {
        let user = await User.findByPk(id)
            .then(({
                dataValues
            }) => dataValues);

        if (!user) {
            throw MessageResponse.notFound();
        }

        //Valid if the current password matches the one stored in the DB
        const validPassword = bcryptjs.compareSync(currentPassword, user.password);

        if (!validPassword) {
            throw new InvalidPasswordError();
        }
        //I encrypt the password and update it in the DB
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync(newPassword, salt);

        await User.update({
            password: hashPassword,
        }, {
            where: {
                id: user.id,
            },
        });

        let userUpdate = await User.findByPk(id)
            .then(({
                dataValues
            }) => dataValues);

        return userUpdate;
    } catch (error) {
        logError('updatePasswordUser', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * verify Email
 *
 * @export
 * @param {string} email
 * @returns {Object}
 */
export async function verifyEmail(email) {
    try {
        let userMail = await User.findOne({
            email: email,
        })
            .then(({
                dataValues
            }) => dataValues);

        if (userMail) {
            return userMail;
        } else {
            throw "The mail is not valid";
        }
    } catch (error) {
        logError('verifyEmail', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * update Password Admin
 *
 * @export
 * @param {number} id
 * @param {string} password
 * @returns {Object}
 */
export async function updatePasswordAdmin(id, password) {
    try {

        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync(password, salt);

        const user = await User.update({
            password: hashPassword,
        }, {
            where: {
                id: id,
            },
        });

        return user;
    } catch (error) {
        logError('updatePasswordAdmin', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * add User
 *
 * @export
 * @param {string} name
 * @param {number} phone
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {number} state
 * @returns {Object}
 */
export async function addUser(name, phone, email, password, role, state) {
    try {
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync(password, salt);
        let newRole = await Role.findOne({
            name: role,
        })
            .then(({
                dataValues
            }) => dataValues.id);

        const user = await User.create({
            name,
            phone,
            email,
            password: hashPassword,
            role_id: newRole,
            state,
        });

        return user;
    } catch (error) {
        logError('addUser', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * get User by ID
 *
 * @export
 * @param {number} id
 * @returns {Object}
 */
export async function getUser(id) {
    try {

        const user = await User.findOne({
            include: {
                all: true,
            },
            where: {
                id: id,
            },
        });
        if (!user) {
            throw MessageResponse.notFound();
        }

        return user;
    } catch (error) {
        logError('getUser', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * update User
 *
 * @export
 * @param {number} id
 * @param {string} name
 * @param {number} phone
 * @param {string} email
 * @returns {Object}
 */
export async function updateUser(id, name, phone, email) {
    try {

        let user = await User.findOne({
            where: {
                id: id,
            },
        }).then(({ dataValues }) => dataValues);

        if (!user) {
            throw MessageResponse.notFound();
        }

        await User.update({
            name: name ? name : user.name,
            phone: phone ? phone : user.phone,
            email: email ? email : user.email,
        }, {
            where: {
                id: id,
            },
        });

        let userUpdate = await User.findByPk(id, {
            include: {
                all: true,
            }
        })
            .then(({
                dataValues
            }) => dataValues);

        if (!userUpdate) {
            throw MessageResponse.notFound();
        }

        return userUpdate;
    } catch (error) {
        logError('updateUser', error)
        throw (MessageResponse.serviceCatch(error))
    }
}