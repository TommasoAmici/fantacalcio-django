import LocalizedStrings from "react-localization";
const StringsActions = new LocalizedStrings({
  en: {
    error401: "You are not authorized to do this. Please login and try again.",
    signup: "Thanks for signing up!",
    logout: "Successfully logged out!"
  },
  it: {
    error401:
      "Non sei autorizzato ad eseguire quest'operazione. Effettua il login e riprova.",
    signup: "Grazie per esserti registrato!",
    logout: "Logout effettuato con successo!"
  }
});

export default StringsActions;
