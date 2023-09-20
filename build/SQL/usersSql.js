"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const conectionStatus = () => {
    try {
        connection.connect();
        console.log("You have been connected to the SQL database");
        return true;
    }
    catch (err) {
        console.log("failed to connect to the SQL database", err);
        return false;
    }
};
conectionStatus();
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getAllUsers = yield connection.query("SELECT * FROM users");
            return getAllUsers;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUser({ id }) {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.getUser = getUser;
function createUser(user) {
    try {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", user, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.createUser = createUser;
function deleteUser({ id }) {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.deleteUser = deleteUser;
function updateUser(userId, updates) {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET ? WHERE id=${userId}`, updates, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.updateUser = updateUser;
connection.end();
