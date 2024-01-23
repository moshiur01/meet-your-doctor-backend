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
exports.doctorReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const review_constrain_1 = require("./review.constrain");
const createDoctorReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const rating = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create doctor review
        const doctorRating = yield transactionClient.doctorReview.create({
            data,
        });
        // Fetch doctor data
        const doctorData = yield transactionClient.doctor.findUnique({
            where: {
                id: data === null || data === void 0 ? void 0 : data.doctorId,
            },
        });
        if (!doctorData) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor not found');
        }
        const updatedNumberOfReviews = doctorData.totalRating + 1;
        //fetch specific doctor all reviews
        const specificDoctorReview = yield prisma_1.default.doctorReview.findMany({
            where: {
                doctorId: doctorData === null || doctorData === void 0 ? void 0 : doctorData.id,
            },
            include: {
                doctor: true,
            },
        });
        let totalRating;
        let updatedAverageRating;
        if ((specificDoctorReview === null || specificDoctorReview === void 0 ? void 0 : specificDoctorReview.length) === 0) {
            totalRating = data === null || data === void 0 ? void 0 : data.rating;
            //@ts-ignore
            // eslint-disable-next-line prefer-const
            updatedAverageRating = totalRating / updatedNumberOfReviews;
        }
        else {
            // eslint-disable-next-line prefer-const
            totalRating = specificDoctorReview === null || specificDoctorReview === void 0 ? void 0 : specificDoctorReview.reduce((accumulator, currentValue) => accumulator + (currentValue === null || currentValue === void 0 ? void 0 : currentValue.rating), 0);
            //@ts-ignore
            // eslint-disable-next-line prefer-const
            updatedAverageRating =
                (totalRating + (data === null || data === void 0 ? void 0 : data.rating)) / updatedNumberOfReviews;
        }
        // console.log(specificDoctorReview);
        // console.log(totalRating);
        // Update doctor model
        yield transactionClient.doctor.update({
            where: {
                id: data === null || data === void 0 ? void 0 : data.doctorId,
            },
            data: {
                totalRating: updatedNumberOfReviews,
                avgRating: updatedAverageRating,
            },
        });
        return doctorRating;
    }));
    return rating;
});
const getAllDoctorReview = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*exact match
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                if (review_constrain_1.doctorReviewRelationalFields.includes(key)) {
                    return {
                        [review_constrain_1.doctorReviewRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.doctorReview.findMany({
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
            doctor: true,
            patient: true,
        },
    });
    const total = yield prisma_1.default.doctorReview.count({
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
const getSpecificDoctorReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.doctorReview.findMany({
        where: {
            doctorId: id,
        },
        include: {
            doctor: true,
            patient: true,
        },
    });
    return result;
});
const deleteDoctorReview = (doctorReviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedRating = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Fetch doctor review data
        const doctorReviewData = yield transactionClient.doctorReview.findUnique({
            where: {
                id: doctorReviewId,
            },
            include: {
                doctor: true,
            },
        });
        if (!doctorReviewData) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor  review not found');
        }
        //fetch specific doctor all reviews
        const specificDoctorReview = yield getSpecificDoctorReview((_a = doctorReviewData === null || doctorReviewData === void 0 ? void 0 : doctorReviewData.doctor) === null || _a === void 0 ? void 0 : _a.id);
        // console.log(specificDoctorReview);
        const totalRating = specificDoctorReview === null || specificDoctorReview === void 0 ? void 0 : specificDoctorReview.reduce((accumulator, currentValue) => accumulator + (currentValue === null || currentValue === void 0 ? void 0 : currentValue.rating), 0);
        const updatedTotalRating = 
        //@ts-ignore
        totalRating - (doctorReviewData === null || doctorReviewData === void 0 ? void 0 : doctorReviewData.rating);
        const updatedNumberOfReviews = doctorReviewData.doctor.totalRating - 1;
        const updatedAverageRating = 
        //@ts-ignore
        updatedTotalRating / updatedNumberOfReviews;
        // Update doctor model
        yield transactionClient.doctor.update({
            where: {
                id: doctorReviewData === null || doctorReviewData === void 0 ? void 0 : doctorReviewData.doctor.id,
            },
            data: {
                totalRating: updatedNumberOfReviews,
                avgRating: updatedAverageRating,
            },
        });
        // Delete doctor review
        yield transactionClient.doctorReview.delete({
            where: {
                id: doctorReviewId,
            },
        });
        return doctorReviewData;
    }));
    return deletedRating;
});
exports.doctorReviewService = {
    createDoctorReview,
    getAllDoctorReview,
    getSpecificDoctorReview,
    deleteDoctorReview,
};
