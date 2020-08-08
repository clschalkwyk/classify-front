import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getToken() {
  return cookies.get('token');
}

export function hasToken() {
  return getToken() !== undefined;
}
