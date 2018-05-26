import LocalizedStrings from "react-localization";
// https://github.com/stefalda/react-localization

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
    home: "Home"
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

const StringsDashboard = new LocalizedStrings({
  en: {
    menu: "Menu",
    home: "Home",
    settings: "Settings",
    competitions: "Competitions",
    new: "New",
    calendar: "Calendar",
    teams: "Teams"
  },
  it: {}
});

const StringsNewLeague = new LocalizedStrings({
  en: {
    noName: "Enter a name for your league",
    invalidName: "Must be 40 characters or fewer",
    newLeague: "Create a new league",
    joinLeague: "Join a league",
    name: "Name"
  },
  it: {}
});

const StringsActions = new LocalizedStrings({
  en: {
    error401: "You are not authorized to do this. Please login and try again.",
    signup: "Thanks for signing up!",
    logout: "Successfully logged out!"
  },
  it: {}
});
export { StringsDashboard, StringsNewLeague, StringsActions };
export default StringsLogin;
