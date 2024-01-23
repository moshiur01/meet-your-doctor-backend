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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const doctor_constrain_1 = require("./doctor.constrain");
const createDoctor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.doctor.create({
        data,
        include: {
            specialization: true,
        },
    });
    return result;
});
const getAllDoctor = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // console.log(skip);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    //*partial match
    if (searchTerm) {
        andConditions.push({
            OR: doctor_constrain_1.doctorSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    //*exact match
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (doctor_constrain_1.doctorRelationalFields.includes(key)) {
                    return {
                        [doctor_constrain_1.doctorRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            specialization: true,
            educations: true,
            experiences: true,
            appointments: true,
            timeSlots: true,
        },
    });
    const total = yield prisma_1.default.doctor.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.doctor.findUnique({
        where: {
            id,
        },
        include: {
            specialization: true,
            appointments: true,
            doctorReviews: true,
            educations: true,
            experiences: true,
            timeSlots: true,
        },
    });
    return result;
});
const updateDoctor = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.doctor.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.doctor.delete({
        where: {
            id,
        },
        include: {
            specialization: true,
        },
    });
    return result;
});
exports.doctorService = {
    createDoctor,
    getAllDoctor,
    getSingleDoctor,
    updateDoctor,
    deleteDoctor,
};
