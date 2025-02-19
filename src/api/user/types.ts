export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: AppRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppRole {
  id: string;
  name: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface LoginResponse {
  user: UserResponse;
  session: Session;
}
