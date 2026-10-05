const crypto = require("crypto");

class AuthService {
    constructor(secretKey) {
        this.secretKey = secretKey || "default_jwt_secret_key_2026";
        this.sessions = new Map();
    }

    hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        return { salt, hash };
    }

    verifyPassword(password, hash, salt) {
        const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        return hash === verifyHash;
    }

    generateToken(userId) {
        const payload = {
            userId,
            timestamp: Date.now()
        };
        const token = Buffer.from(JSON.stringify(payload)).toString("base64");
        this.sessions.set(token, userId);
        return token;
    }

    verifyToken(token) {
        if (!this.sessions.has(token)) {
            return { valid: false, message: "Invalid or expired token" };
        }
        return { valid: true, userId: this.sessions.get(token) };
    }

    logout(token) {
        return this.sessions.delete(token);
    }
}

module.exports = AuthService;
