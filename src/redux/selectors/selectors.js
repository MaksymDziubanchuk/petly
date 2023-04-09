export const isLogin = ({ auth }) => auth.isLogin;
export const getUser = ({ auth }) => auth.user;
export const getPets = ({ user }) => user.pets;
export const getLoading = ({ auth }) => auth.loading;
