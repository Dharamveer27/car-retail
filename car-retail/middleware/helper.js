import { getBuyersAndManagers } from "../controlers/adminControler.js";
import { getBuyers } from "../controlers/managerControler.js";



export const getUsers = (req, res, next) => {
    if (req.user.role === 'admin') {
        getBuyersAndManagers(req, res, next);
    } else if (req.user.role === 'manager') {
        getBuyers(req, res, next)
    }
    else {
        res.send({ "message": "You are not Authenticate user" });
    }
}

