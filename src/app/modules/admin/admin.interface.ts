export type IAdminFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  gender?: 'male' | 'female';
  phoneNumber?: string | undefined;
};
