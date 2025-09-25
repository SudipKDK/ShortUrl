

import { getUser } from "../service/auth.js";

export const restrictTologgedInUserOnly = (req, res, next) => {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    if (!user) {
        return res.redirect('/login');
    }
    
    req.user = user;
    next();
};
