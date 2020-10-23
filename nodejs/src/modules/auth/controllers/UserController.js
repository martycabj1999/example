import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readUsers,
    updatePasswordUser,
    updatePasswordAdmin,
    addUser,
    getUser,
    updateUser,
} from '../services/UserService'
import {
    changeAvatar
} from '../services/CreateAvatarService'
import randomString from '../utils/randomString'
import {
    URL_BACKEND
} from '../../../../config'
import {
    AWS_S3_BUCKET_AVATAR_FOLDER
} from '../../../../config'
import {
    MessageResponse
} from '../../../helpers/messageResponse'
import {
    uploadFileS3
} from '../../../../config/aws'

/**
 * readUsersAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.readUsersAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const users = await readUsers()

        if (users) {
            response.data = users
            return res.status(200).json(response)
        } else {
            response.message = MessageResponse.notFound()
            return res.status(400).send(response)
        }
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }

}

/**
 * readAvatarAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.readAvatarAction = async function (req, res) {

    var urlBackend = URL_BACKEND.concat('/')

    let response = logRequest(req)

    const user = await getUser(req.user.id)
    const avatar = urlBackend.concat(user.avatar)

    try {
        if (avatar) {
            response.data = avatar
            return res.status(200).json(avatar)
        } else {
            response.message = MessageResponse.notFound()
            return res.status(400).send(response)
        }
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }

}

/**
 * createAvatarAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.createAvatarAction = async function (req, res) {

    let response = logRequest(req)

    let {
        user,
        file
    } = req

    if (!req.file) {
        response.message = MessageResponse.missingParam()
        res.status(400).send(response)
    }
    const imgUrl = randomString()
    try {
        await uploadFileS3(file, AWS_S3_BUCKET_AVATAR_FOLDER, async (err, data) => {
            //an error occurred while uploading the file
            if (err) {
                return response(res, 500)
            }
            const avatarResult = await changeAvatar(user.id, data.Location, file.originalname, file
                .size)

            if (!avatarResult) {
                response.message = MessageResponse.dbError()
                return res.status(400).send(response)
            }

            response.data = data.Location
            response.message = MessageResponse.isUploaded()
            return res.status(200).send(response)

        }, imgUrl)

    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

/**
 * updatePasswordUserAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.updatePasswordUserAction = async function (req, res) {

    let response = logRequest(req)

    let {
        currentPassword,
        newPassword
    } = req.body

    //I check if the user exists in the database

    try {
        let user = await updatePasswordUser(req.user.id, currentPassword, newPassword)

        response.data = user
        res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(400).json(response)
    }

}

/**
 * updatePasswordAdminAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.updatePasswordAdminAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const user = await updatePasswordAdmin(req.params.id, req.body.password)

        if (!user) {
            response.message = MessageResponse.notFound()
            return res.status(404).json(response)
        }

        response.message = 'The password was successfully modified'
        res.status(200).json(response)


    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

/**
 * addUserAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.addUserAction = async function (req, res) {

    let response = logRequest(req)

    let {
        name,
        phone,
        email,
        password,
        role,
        state
    } = req.body

    try {

        const user = await addUser(name, phone, email, password, role, state)

        response.data = user
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }

}

/**
 * getUserAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.getUserAction = async function (req, res) {
    let response = logRequest(req)
    try {
        let id = req.params.id
        const user = await getUser(id)
        response.data = user
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

/**
 * getUserByTokenAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.getUserByTokenAction = async function (req, res) {
    let response = logRequest(req)
    try {
        const user = await getUser(req.user.id)
        response.data = user
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(400).send(response)
    }
}

/**
 * updateUserAction
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.updateUserAction = async function (req, res) {
    let response = logRequest(req)
    try {
        let {
            name,
            phone,
            email
        } = req.body

        const userUpdate = await updateUser(req.user.id, name, phone, email)
        response.data = userUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}