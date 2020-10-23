import {
    logRequest,
    logError
} from '../../logger/logger';
import {
    readRolesService
} from '../services/RoleService';

/**
 * readRolesAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.readRolesAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const roles = await readRolesService()

        response.data = roles
        return res.status(200).json(response);
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).json(response);
    }


}
