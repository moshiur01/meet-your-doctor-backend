export const doctorReviewFilterableFields: string[] = ['doctorId', 'patientId'];

//for relational fields

export const doctorReviewRelationalFields: string[] = ['doctorId', 'patientId'];

export const doctorReviewRelationalFieldsMapper: { [key: string]: string } = {
  doctorId: 'doctor',
  patientId: 'patient',
};
