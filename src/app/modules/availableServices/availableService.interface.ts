export type IAvailableServiceFilterRequest = {
  slotDate?: string | undefined;
  isBooked?: boolean | undefined | string;
  doctorId?: string | undefined;
  serviceId?: string | undefined;
  slotId?: string | undefined;
};
