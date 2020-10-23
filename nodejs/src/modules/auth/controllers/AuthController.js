import {
    logRequest,
    logError
} from '../../logger/logger'
const {
    validationResult
} = require('express-validator');
import {
    authService,
    authMethodService
} from '../services/AuthService'
import axios from 'axios'

/**
 * authAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.authAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const authResult = await authService(req.body.email, req.body.password)

        if (authResult.status === false) {
            response.message = authResult.msg
            return res.status(403).json(response);
        }

        response.data = authResult
        return res.status(200).json(response);
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).json(response);
    }


}