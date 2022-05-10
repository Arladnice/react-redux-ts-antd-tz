import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetLoadingAction,
  SetUserAction,
} from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const responce = await UserService.getUsers();
          const mockUser = responce.data.find(
            (user) => user.username === username && user.password === password
          );
          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setIsAuth(true));
          } else {
            dispatch(
              AuthActionCreators.setError("Некорректный логин или пароль")
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (error) {
        dispatch(AuthActionCreators.setError("Произошла ошибка при логине"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
