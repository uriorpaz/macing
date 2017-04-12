export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';

export const facebookLoginSuccess = (user) => {
  return {
    type: FB_LOGIN_SUCCESS,
    payload: user
  };
};
