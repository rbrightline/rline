export type UsernameField = {
  username: string;
};

export type PasswordField = {
  password: string;
};

export type SSOField = {
  sso: string;
};

export type TokenField = {
  token: string;
};

export type Login = UsernameField & PasswordField;

export type ForgotPassword = UsernameField;

export type LoginWithSSO = UsernameField & SSOField;

export type Signup = UsernameField & PasswordField;

export type LoginResult = TokenField;

export type UpdatePassword = Login;
