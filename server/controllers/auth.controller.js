import { User } from '../models/userAuth.model.js';

export const signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
    } catch (err) {
        console.log(err);
    }
};
