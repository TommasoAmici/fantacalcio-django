// https://github.com/stefalda/react-localization
import LocalizedStrings from "react-localization";

export { default as StringsDate } from "./StringsDate";
export { default as StringsNewLeague } from "./StringsNewLeague";
export { default as StringsActions } from "./StringsActions";
export { default as StringsDashboard } from "./StringsDashboard";
export { default as StringsLeagueSettings } from "./StringsLeagueSettings";
export { default as StringsSettings } from "./StringsSettings";
export { default as StringsNewCompetition } from "./StringsNewCompetition";
export { default as StringsTeams } from "./StringsTeams";
export { default as StringsLogin } from "./StringsLogin";

const Strings = new LocalizedStrings({
  en: {
    optional: "Optional",
    selectImage: "Select image"
  },
  it: {}
});
export default Strings;
