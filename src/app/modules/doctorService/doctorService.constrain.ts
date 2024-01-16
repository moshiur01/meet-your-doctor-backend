export const doctorServiceFilterableFields: string[] = [
  'isBooked',
  'doctorId',
  'slotId',
];

export const doctorServiceRelationalFields: string[] = [
  'availableDoctorId',
  'slotId',
];

export const doctorServiceRelationalFieldsMapper: { [key: string]: string } = {
  doctorId: 'doctor',
  slotId: 'slot',
};
