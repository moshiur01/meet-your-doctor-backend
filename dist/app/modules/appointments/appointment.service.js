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
exports.appointmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const appointments_constrain_1 = require("./appointments.constrain");
const bookAppointment = (patientId, availableServiceId, appointmentDate) => __awaiter(void 0, void 0, void 0, function* () {
    //check the availableService
    const availableService = yield prisma_1.default.availableService.findUnique({
        where: {
            id: availableServiceId,
        },
    });
    if (!availableService) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This service is not found');
    }
    if (availableService.availableSeats === 0) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'This service is fully booked');
    }
    const booking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const appointment = yield transactionClient.appointment.create({
            data: {
                appointmentDate,
                patientId,
                availableServiceId,
                status: 'pending',
            },
        });
        yield transactionClient.availableService.update({
            where: {
                id: availableServiceId,
            },
            data: {
                availableSeats: availableService.availableSeats - 1,
                isBooked: availableService.availableSeats - 1 === 0 ? true : false,
            },
        });
        const payment = yield transactionClient.payment.create({
            data: {
                amount: availableService.fees,
                paymentStatus: 'pending',
                appointmentId: appointment.id,
            },
        });
        return {
            appointment: appointment,
            payment: payment,
        };
    }));
    return booking;
});
const canceledAppointment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield prisma_1.default.appointment.findUnique({
        where: {
            id: appointmentId,
        },
    });
    if (!appointment) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'The appointment does not exist');
    }
    if (appointment.status === 'canceled') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Appointment has already been canceled');
    }
    if (appointment.status === 'finished') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Appointment has already been finished');
    }
    const canceledAppointment = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentToCancel = yield transactionClient.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                status: 'canceled',
            },
        });
        const availableService = yield transactionClient.availableService.findUnique({
            where: {
                id: appointment.availableServiceId,
            },
        });
        yield transactionClient.availableService.update({
            where: {
                id: appointment.availableServiceId,
            },
            data: {
                availableSeats: {
                    increment: 1,
                },
                isBooked: availableService && availableService.availableSeats + 1 > 0
                    ? false
                    : true,
            },
        });
        yield transactionClient.payment.update({
            where: {
                appointmentId,
            },
            data: {
                paymentStatus: 'canceled',
            },
        });
        return {
            appointment: appointmentToCancel,
        };
    }));
    return canceledAppointment;
});
const finishAppointment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield prisma_1.default.appointment.findUnique({
        where: {
            id: appointmentId,
        },
    });
    if (!appointment) {
        throw new Error('Appointment does not exist');
    }
    if (appointment.status === 'cancelled') {
        throw new Error('Appointment has already been cancelled');
    }
    const finishedAppointment = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.payment.update({
            where: {
                appointmentId,
            },
            data: {
                paymentStatus: 'paid',
                paymentDate: new Date().toISOString(),
            },
        });
        const appointmentToFinish = yield transactionClient.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                status: 'finished',
            },
        });
        if (!appointmentToFinish) {
            yield transactionClient.payment.update({
                where: {
                    appointmentId,
                },
                data: {
                    paymentStatus: 'refund',
                },
            });
        }
        return appointmentToFinish;
    }));
    return finishedAppointment;
});
const getAllAppointment = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*exact match
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                //filter for relational fields
                if (appointments_constrain_1.appointmentRelationalFields.includes(key)) {
                    return {
                        [appointments_constrain_1.appointmentRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.appointment.findMany({
        where: whereConditions,
        include: {
            availableService: true,
            patient: true,
        },
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
    const total = yield prisma_1.default.appointment.count({
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
const getSingleAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.findUnique({
        where: {
            id: id,
        },
        include: {
            availableService: true,
            patient: true,
        },
    });
    return result;
});
const updateAppointment = (id, appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.update({
        where: {
            id: id,
        },
        data: appointment,
    });
    return result;
});
const deleteAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.appointmentService = {
    bookAppointment,
    canceledAppointment,
    getAllAppointment,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment,
    finishAppointment,
};
