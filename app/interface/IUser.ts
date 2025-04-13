// Định nghĩa kiểu dữ liệu cho user
export interface User {
  email: string;
  displayName: string;
  picture: string;
  money: string;
  aboutMe: string;
  phone: string;
  dob: string;
  gender: string
}

export interface IChangePassword {
  code: number,
  respond: {
    message: string,
    jwt?: string
    error?: string
  }
}

export interface IChangeInfo {
  code: number,
  respond: {
    message: string,
    error: string | undefined
  }
}