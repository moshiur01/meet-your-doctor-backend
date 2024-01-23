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
exports.doctorEducationService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createDoctorEducation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.create({
        data,
    });
    return result;
});
const getAllDoctorEducation = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.findMany({
        where: {},
        include: {
            doctor: true,
        },
    });
    return result;
});
const getSingleDoctorEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.findUnique({
        where: {
            id,
        },
        include: {
            doctor: true,
        },
    });
    return result;
});
const getSingleSpecificDoctorEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.findMany({
        where: {
            doctorId: id,
        },
        include: {
            doctor: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });
    return result;
});
const updateDoctorEducation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDoctorEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.education.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.doctorEducationService = {
    createDoctorEducation,
    getSingleDoctorEducation,
    getSingleSpecificDoctorEducation,
    getAllDoctorEducation,
    updateDoctorEducation,
    deleteDoctorEducation,
};
