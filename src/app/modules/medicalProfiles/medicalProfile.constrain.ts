export const medicalProfileSearchableFields: string[] = ['address'];

export const medicalProfileFilterableFields: string[] = [
  'searchTerm',
  'gender',
  'emergencyContact',
  'patientId',
];

export const medicalProfileRelationFields: string[] = ['patientId'];

export const medicalProfileRelationFieldsMapper: { [key: string]: string } = {
  patientId: 'patient',
};
