import { getRequest, postRequest } from './request.js';

export const isLoggedIn = async token => {
  const res = await getRequest('/auth/is-logged', { Authorization: token });

  console.log ("respuesta del /auth/is-logged -",res,"-")

  if (res==' OK ') {
    console.log ("El back nos dice que el usuario es incorrecto")
    throw new Error('User not authenticated');
  }

  return true
};

export const whoAmI = async token => {
  const user = await getRequest('/auth/who', { Authorization: token });

  console.log ("respuesta del /auth/who", user)

  if (!user.email) {
    console.log ("El back nos dice que el usuario es incorrecto")
    throw new Error('User not authenticated');
  }

  console.log ("Usuario Autenticado por back como user:", user)
  return user.email
};

export const register = async body => {
  const res = await postRequest('/auth/register', body);
  const response = await res.json();

  if (!res.ok) {
    throw new Error(response);
  }

  return response;
};

export const login = async body => {
  const res = await postRequest('/auth/login', body);
  const response = await res.json();

  if (!res.ok) {
    throw new Error(response);
  }

  return response;
};

