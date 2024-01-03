export const paymentFilterableFields: string[] = [
  'paymentDate',
  'paymentStatus',
  'appointmentId',
];

export const paymentRelationalFields: string[] = ['appointmentId'];

export const paymentRelationalFieldsMapper: { [key: string]: string } = {
  appointmentId: 'appointment',
};
