export const availableDoctorFilterableFields: string[] = [
  'doctorId',
  'slotId',
  'availableDate',
];

export const availableDoctorRelationalFields: string[] = ['doctorId', 'slotId'];

export const availableDoctorRelationalFieldsMapper: { [key: string]: string } =
  { doctorId: 'doctor', slotId: 'timeSlot' };
