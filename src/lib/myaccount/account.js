import axiosApi from '../actions/endpoint';
import {hasToken} from '../token';

export async function getProfile(){
  if(hasToken()) {
    const profile = await axiosApi.get('/user/me');
    return profile;
  }
  return {};
}

export async function validToken() {
  const res = await axiosApi.get('/auth/profile');

  if (res) {
    return (res.id !== '' && res.email !== '');
  }

  return false;
}
