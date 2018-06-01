import LocalizedStrings from "react-localization";
const StringsLogin = new LocalizedStrings({
  en: {
    noUsername: "Enter a username",
    invalidUsername: "Must be 15 characters or fewer",
    noEmail: "Enter an email address",
    invalidEmail: "Enter a valid email address",
    noPassword: "Enter a password",
    invalidPassword: "Must be at 8 characters long with 1 digit",
    repeatPassword: "Repeat password",
    resetPassword: "Did you forget your password?",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    leagues: "Leagues",
    home: "Home",
    chooseLeague: "Choose league"
  },
  it: {
    noUsername: "Inserisci un nome utente",
    invalidUsername: "Massimo 15 caratteri",
    noEmail: "Inserisci un indirizzo email",
    invalidEmail: "Inserisci un indirizzo email valido",
    noPassword: "Inserisci una password",
    invalidPassword: "Minimo 8 caratteri e 1 numero",
    repeatPassword: "Ripeti password",
    resetPassword: "Hai dimenticato la password?",
    login: "Login",
    signup: "Registrati",
    logout: "Logout",
    leagues: "Leghe",
    home: "Home"
  }
});

export default StringsLogin;
