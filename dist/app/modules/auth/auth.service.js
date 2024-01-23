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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    let isUserExist;
    const admin = yield prisma_1.default.admin.findUnique({
        where: {
            email,
        },
    });
    const doctor = yield prisma_1.default.doctor.findUnique({
        where: { email },
    });
    const patient = yield prisma_1.default.patient.findUnique({
        where: { email },
    });
    const medicineMan = yield prisma_1.default.medicineMan.findUnique({
        where: { email },
    });
    if (!admin && !patient && !doctor && !medicineMan) {
        throw new Error('User does not exist');
    }
    if (admin || patient || doctor || medicineMan) {
        isUserExist = admin || patient || doctor || medicineMan;
    }
    if (isUserExist && isUserExist.password !== password) {
        throw new Error('Password is incorrect');
    }
    const payloadData = {
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
        phoneNumber: isUserExist.phoneNumber,
        name: isUserExist.name,
        photo: isUserExist.photo,
    };
    // console.log(payloadData);
    //   create token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(payloadData, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error('Token is required');
    }
    const decodedToken = jwtHelpers_1.jwtHelpers.decodeToken(token);
    const { email, role, phoneNumber, name, photo, id } = decodedToken;
    if (!email || !role || !phoneNumber || !name || !photo || !id) {
        throw new Error('Invalid token');
    }
    const admin = yield prisma_1.default.admin.findUnique({
        where: {
            email,
        },
    });
    const doctor = yield prisma_1.default.doctor.findUnique({
        where: { email },
    });
    const patient = yield prisma_1.default.patient.findUnique({
        where: { email },
    });
    const medicineMan = yield prisma_1.default.medicineMan.findUnique({
        where: { email },
    });
    if (!admin && !patient && !doctor && !medicineMan) {
        throw new Error('User does not exist');
    }
    const payloadData = {
        id: id,
        email: email,
        role: role,
        phoneNumber: phoneNumber,
        name: name,
        photo: photo,
    };
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(payloadData, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.authServices = { loginUser, refreshToken };
