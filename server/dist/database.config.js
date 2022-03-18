"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DB = void 0;
exports._DB = {
    host: `${process.env.DB_HOST}`,
    port: parseInt(process.env.DB_PORT),
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
};
//# sourceMappingURL=database.config.js.map