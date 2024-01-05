export type IAdminFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  gender?: 'male' | 'female';
  role?: 'admin' | 'super_admin';
  phoneNumber?: string | undefined;
};
