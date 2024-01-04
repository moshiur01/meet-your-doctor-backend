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
exports.timeSlotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createTimeSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.timeSlot.create({
        data: payload,
    });
    return result;
});
const getAllTimeSlot = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.timeSlot.findMany({
        where: {},
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.timeSlot.count({
        where: {},
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
const getSingleTimeSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.timeSlot.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateTimeSlot = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleTimeSlot(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Time slot data not found');
    }
    const result = yield prisma_1.default.timeSlot.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteTimeSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield getSingleTimeSlot(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Time slot data not found');
    }
    const result = yield prisma_1.default.timeSlot.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.timeSlotService = {
    createTimeSlot,
    getAllTimeSlot,
    getSingleTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
};
