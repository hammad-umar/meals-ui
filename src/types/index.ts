export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Member extends User {
  dietaryRestrictions: string;
}

export interface RegisterRequest extends Pick<User, 'name' | 'email'> {
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;

export interface LoginResponse extends RegisterResponse {
  accessToken: string;
}

export interface GetMealDetailsResponse {
  meals: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  userName: string;
  gender: string;
  age: number;
  projectName: string;
  projectDescription: string;
  ethnicity: string;
  createdAt: string;
  updatedAt: string;
}
