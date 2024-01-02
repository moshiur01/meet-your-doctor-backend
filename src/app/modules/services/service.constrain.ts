export const serviceSearchableFields: string[] = ['name'];

export const serviceFilterableFields: string[] = [
  'searchTerm',
  'specializationId',
];

export const serviceRelationalFields: string[] = ['specializationId'];

export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  specializationId: 'specialization',
};
