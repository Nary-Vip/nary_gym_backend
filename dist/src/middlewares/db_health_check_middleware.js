"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const databaseMiddleware = (req, res, next) => {
    if (!db_1.isDatabaseConnected) {
        return res.status(503).json({
            message: "Database unavailable"
        });
    }
    next();
};
exports.default = databaseMiddleware;
