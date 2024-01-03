export type IAvailableServiceFilterRequest = {
  slotDate?: string | undefined;
  isBooked?: boolean | undefined | string;
  availableDoctorId?: string | undefined;
  serviceId?: string | undefined;
  slotId?: string | undefined;
};
