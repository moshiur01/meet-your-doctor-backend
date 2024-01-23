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
exports.availableService_Service = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const availableService_constrain_1 = require("./availableService.constrain");
const createAvailableService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.create({
        data,
    });
    return result;
});
const getAllAvailableService = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*exact match
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                //filter for relational fields
                if (availableService_constrain_1.availableServiceRelationalFields.includes(key)) {
                    return {
                        [availableService_constrain_1.availableServiceRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.availableService.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            service: {
                include: {
                    specialization: true,
                },
            },
            doctor: true,
            appointments: {
                include: {
                    patient: true,
                    payment: true,
                },
            },
            slot: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.availableService.count({
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
const getSingleAvailableService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.findUnique({
        where: {
            id: id,
        },
        include: {
            service: {
                include: {
                    specialization: true,
                },
            },
            doctor: true,
            appointments: {
                include: {
                    patient: true,
                    payment: true,
                },
            },
        },
    });
    return result;
});
const updateAvailableService = (id, availableService) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleAvailableService(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Available Service data not found');
    }
    const result = yield prisma_1.default.availableService.update({
        where: {
            id: id,
        },
        data: availableService,
    });
    return result;
});
const deleteAvailableService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleAvailableService(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Available Service data not found');
    }
    const result = yield prisma_1.default.availableService.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.availableService_Service = {
    createAvailableService,
    getAllAvailableService,
    getSingleAvailableService,
    updateAvailableService,
    deleteAvailableService,
};
