export interface User {
  username: string;
  email: string;
  password: string;
  tokens?: string[];
  profilePicture?: string;
}
