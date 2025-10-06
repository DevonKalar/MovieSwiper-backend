import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

type AuthenticatedRequest = Request & { user?: string | object };

interface JwtPayload {
    id: string;
}

const checkToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded as JwtPayload;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default checkToken;