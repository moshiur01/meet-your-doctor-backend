export const availableServiceFilterableFields: string[] = [
  'slotDate',
  'isBooked',
  'doctorId',
  'serviceId',
  'slotId',
];

export const availableServiceRelationalFields: string[] = [
  'availableDoctorId',
  'serviceId',
  'slotId',
];

export const availableServiceRelationalFieldsMapper: { [key: string]: string } =
  {
    doctorId: 'doctor',
    serviceId: 'service',
    slotId: 'slot',
  };
