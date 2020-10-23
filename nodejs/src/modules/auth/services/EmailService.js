import ProviderSMTP from '../../../../SMTP/ProviderSMTP';
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

/**
 * emailService
 *
 * @export
 * @param {string} name
 * @param {string} email
 * @returns {Object}
 */
export const emailService = async function (name, email) {
    try {
        console.log('name', name)
        ProviderSMTP.sendEmail(name, email)
            .then(response => {
                console.log('response', response)
                return response
            })
            .catch(error => {
                console.log('error', error)
                console.error(error);
                return error
            })
    } catch (error) {
        logError('emailService', error)
        throw ('error Send mail')
    }
}

/**
 * emailServiceResetPassword
 *
 * @export
 * @param {string} name
 * @param {string} email
 * @param {string} token
 * @returns {Object}
 */
export const emailServiceResetPassword = async function (name, email, token) {
    try {
        ProviderSMTP.sendEmailResetPassword(name, email, token)
            .then(response => {
                return response
            })
            .catch(error => {
                console.error(error);
                return error
            })
    } catch (error) {
        logError('emailService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}
