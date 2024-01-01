import store from "../redux/store/store";
import {loginAction, registerAction} from "../redux/actions/authActions";

export const loginFormHandler = async ({ email, password, role }) => {
  store.dispatch(loginAction({ email, password, role }));
};

export const registerFormHandler = (formData) => {
  store.dispatch(registerAction(formData));
};
