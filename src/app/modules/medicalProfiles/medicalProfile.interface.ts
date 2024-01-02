export type IMedicalProfileFilterRequest = {
  searchTerm?: string | undefined;
  gender?: 'male' | 'female';
  emergencyContact?: string | undefined;
  patientId?: string | undefined;
};
