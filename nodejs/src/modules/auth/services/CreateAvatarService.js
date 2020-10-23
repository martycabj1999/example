import Sequelize from 'sequelize';
import UserModel from '../models/UserModel';
import fs from 'fs-extra'
import path from 'path'
import randomString from '../utils/randomString'
import sizeOf from 'image-size'
import {
    DBURL
} from '../../../../config';

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

export const changeAvatar = async function (userId, name, filepath, originalname, size) {

    const imgUrl = randomString();
    const imageTempPath = filepath;
    const ext = path.extname(originalname).toLowerCase();
    const targetPath = path.resolve(`assets/avatar/${name}_${imgUrl}${ext}`);
    const dimensions = sizeOf(imageTempPath);
    // Validate Extension
    if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size < 5000000 || dimensions.height <= 200 || dimensions.width <= 200) {
        const avatarRemove = await User.findByPk(userId)
        try {
            fs.statSync(avatarRemove.avatar)
            if (avatarRemove.avatar && avatarRemove.avatar != "assets/avatar/user.png") {
                await fs.unlink(avatarRemove.avatar);
            }
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                console.log('file or directory does not exist');
            }
        }

        const avatar = `assets/avatar/${name}_${imgUrl}${ext}`

        const user = await User.update({
            avatar: avatar
        }, {
            where: {
                id: userId
            }
        })

        if (!user) {
            return { state: false, msg: "Error database" }
        }

        await fs.rename(imageTempPath, targetPath);
        return { state: true, msg: "Avatar Modified", avatar: avatar }

    } else {
        await fs.unlink(imageTempPath);
        return { state: false, msg: "The image does not meet the requirements (size less than 5Mb, extension .png, jpeg or jpg) and / or is greater than 800 * 800" }
    }
};


