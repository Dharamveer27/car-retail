import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid Token " });
            } else {
                req.user = decode;

                next();
            }
        });
    } else {
        res.status(401).send({ message: "Invalid Token " });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user, req.user.role === 'admin') {
        next();
    } else {
        res.status(401).send({ message: 'Not an Admin' })
    }
}

export const isManager = (req, res, next) => {
    if (req.user, req.user.role === 'manager') {
        next();
    } else {
        res.status(401).send({ message: 'Not Authorised' })
    }
}
