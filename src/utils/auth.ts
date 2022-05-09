import {expressjwt, Request as JWTRequest} from "express-jwt"
import {Response, NextFunction} from "express"
import jwks from "jwks-rsa"


if (!process.env.AUTH_JWKS_URI) {
    process.exit(1)
}

export const authCheck = expressjwt({
    secret: jwks.expressJwtSecret({
        jwksUri: process.env.AUTH_JWKS_URI,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5
    }),
    audience: process.env.AUTH_AUDIENCE,
    issuer: process.env.AUTH_ISSUER,
    algorithms: ['RS256']
})

export const validateToken = (err: Error, _req: JWTRequest, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError")
        res.status(401).send({msg: err.message})
    else
        next(err)
}

