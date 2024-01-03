export const availableServiceFilterableFields: string[] = [
  'slotDate',
  'isBooked',
  'availableDoctorId',
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
    availableDoctorId: 'availableDoctor',
    serviceId: 'service',
    slotId: 'slot',
  };
