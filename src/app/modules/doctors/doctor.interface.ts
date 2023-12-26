export type IDoctorFilterRequest = {
  searchTerm?: string | undefined;
  gender?: 'male' | 'female';
  specializationId?: string | undefined;
};
