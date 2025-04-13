import { IChangeInfo, IChangePassword, User } from "../interface/IUser";
import { ApiService } from "./root"; 

export const login = async () => {
  try {
    const data = await ApiService.post<{ token: string }>('/auth/login', {
      email: 'demo@gmail.com',
      password: '123456',
    });
    console.log('Token:', data.token);
  } catch (error: any) {
    console.error('Login error:', error.message);
  }
};

export const info = async (token: string) => {
  try {
    const data = await ApiService.get<User>('api/info', {
      token: token,
    })
    if (data) {
      console.log('User', data)
      return data
    }
    return false
  } catch (error: any) {
    console.log('User error', error.message)
  } 
}



export const changePassword = async (token: string, password: string) => {
  try {
    const data = await ApiService.patch<IChangePassword>('api/changePassword', {
      newPassword: password
    }, {
      token: token
    })
    console.log(data)
    if (data && data.code === 200) {
      console.log('Success', data.respond.message)
      return data.respond
    }
    return data.respond
  }catch(error: any) {
    console.log('User error', error.message)
  } 
}

export const changeInfo = async (input: any, token: string) => {
  try {
    const data = await ApiService.patch<IChangeInfo>('api/info', input, {
      token: token
    })
    return data.respond
  }catch(error: any){
    console.log('User error', error.message)
  }
}