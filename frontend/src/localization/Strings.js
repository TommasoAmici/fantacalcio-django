// https://github.com/stefalda/react-localization
import LocalizedStrings from "react-localization";

import StringsDate from "./StringsDate";
import StringsNewLeague from "./StringsNewLeague";
import StringsActions from "./StringsActions";
import StringsDashboard from "./StringsDashboard";
import StringsLogin from "./StringsLogin";
import StringsLeagueSettings from "./StringsLeagueSettings";
import StringsSettings from "./StringsSettings";
import StringsNewCompetition from "./StringsNewCompetition";
import StringsTeams from "./StringsTeams";

export {
  StringsDashboard,
  StringsNewLeague,
  StringsActions,
  StringsDate,
  StringsLogin,
  StringsLeagueSettings,
  StringsSettings,
  StringsNewCompetition,
  StringsTeams
};

const Strings = new LocalizedStrings({
  en: {
    optional: "Optional",
    selectImage: "Select image"
  },
  it: {}
});
export default Strings;
