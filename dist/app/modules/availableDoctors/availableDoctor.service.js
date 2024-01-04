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
exports.availableDoctorServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const availableDoctor_constrain_1 = require("./availableDoctor.constrain");
const createAvailableDoctor = (availableDoctor) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableDoctor.create({
        data: availableDoctor,
    });
    return result;
});
const getAllAvailableDoctor = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*exact match
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                //filter for relational fields
                if (availableDoctor_constrain_1.availableDoctorRelationalFields.includes(key)) {
                    return {
                        [availableDoctor_constrain_1.availableDoctorRelationalFieldsMapper[key]]: {
                            id: filters[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filters[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.availableDoctor.findMany({
        where: whereConditions,
        skip,
        include: {
            doctor: {
                include: {
                    availability: {
                        include: {
                            slot: true,
                        },
                    },
                    specialization: {
                        include: {
                            service: true,
                        },
                    },
                },
            },
            availableServices: {
                include: {
                    service: true,
                    slot: true,
                },
            },
            slot: true,
        },
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.availableDoctor.count({
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
const getSingleAvailableDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableDoctor.findUnique({
        where: {
            id: id,
        },
        include: {
            doctor: {
                include: {
                    availability: {
                        include: {
                            slot: true,
                        },
                    },
                    specialization: {
                        include: {
                            service: true,
                        },
                    },
                },
            },
            availableServices: {
                include: {
                    service: true,
                    slot: true,
                },
            },
            slot: true,
        },
    });
    return result;
});
const updateAvailableDoctor = (id, availableDoctor) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleAvailableDoctor(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data not Found');
    }
    const result = yield prisma_1.default.availableDoctor.update({
        where: {
            id: id,
        },
        data: availableDoctor,
    });
    return result;
});
const deleteAvailableDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleAvailableDoctor(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data not Found');
    }
    const result = yield prisma_1.default.availableDoctor.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.availableDoctorServices = {
    createAvailableDoctor,
    getAllAvailableDoctor,
    getSingleAvailableDoctor,
    updateAvailableDoctor,
    deleteAvailableDoctor,
};
