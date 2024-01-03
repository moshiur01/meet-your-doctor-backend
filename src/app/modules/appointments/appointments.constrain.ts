export const appointmentFilterableFields: string[] = [
  'appointmentDate',
  'status',
  'patientId',
  'availableServiceId',
];
export const appointmentRelationalFields: string[] = [
  'patientId',
  'availableServiceId',
];
export const appointmentRelationalFieldsMapper: { [key: string]: string } = {
  patientId: 'patient',
  availableServiceId: 'availableService',
};
