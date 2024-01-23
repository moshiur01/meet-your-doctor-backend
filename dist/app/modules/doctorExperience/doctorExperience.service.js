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
exports.doctorExperienceService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createDoctorExperience = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.create({
        data,
    });
    return result;
});
const getAllDoctorExperience = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.findMany({
        where: {},
        include: {
            doctor: true,
        },
    });
    return result;
});
const getSingleDoctorExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.findUnique({
        where: {
            id,
        },
        include: {
            doctor: true,
        },
    });
    return result;
});
const getSingleSpecificDoctorExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.findMany({
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
const updateDoctorExperience = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDoctorExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.experience.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.doctorExperienceService = {
    createDoctorExperience,
    getAllDoctorExperience,
    getSingleDoctorExperience,
    getSingleSpecificDoctorExperience,
    updateDoctorExperience,
    deleteDoctorExperience,
};
