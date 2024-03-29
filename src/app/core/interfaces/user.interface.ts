export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserResponse {
  data: User[];
  page: number;
  per_page: number;
  support: any;
  total: number;
  total_pages: number;
}
