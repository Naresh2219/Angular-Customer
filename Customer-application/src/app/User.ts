export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?:String;
  image?: string;
  title?: string;
  description?: string;
  status?: string;
}
