export const doctorSearchableFields: string[] = ['name', 'email'];

export const doctorFilterableFields: string[] = [
  'searchTerm',
  'gender',
  'specializationId',
];

//for relational fields

export const doctorRelationalFields: string[] = ['specializationId'];

export const doctorRelationalFieldsMapper: { [key: string]: string } = {
  specializationId: 'specialization',
};
