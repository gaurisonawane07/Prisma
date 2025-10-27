const getJwtToken = require('../helpers/getJwtToken')

const cookieToken = (User, res) => {
    const token = getJwtToken(User.id);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000 //3 days from now
        ),
        httpOnly: true
    }
    User.password = undefined;
    res.status(200).cookie('token',token,options).json({
        success:true,
        token,
        User
    })
}

module.exports = cookieToken;