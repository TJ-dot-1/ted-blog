import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Check if token is in "Bearer <token>" format
    const tokenParts = token.split(' ');
    const actualToken = tokenParts.length === 2 ? tokenParts[1] : token;

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        
        // Add user data to request object
        req.user = decoded;
        
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(401).json({ message: 'Token is not valid' });
        }
    }
};

export default auth;