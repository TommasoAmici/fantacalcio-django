import LocalizedStrings from "react-localization";
const StringsNewCompetition = new LocalizedStrings({
  en: {
    titleCreate: "Create a new competition",
    noName: "Enter a name for your competition",
    button: "New competition",
    name: "Competition name",
    invalidName: "Must be 40 characters or fewer",
    matchdays: "Number of matchdays",
    firstMatch: "First matchday",
    lastMatch: "Last matchday",
    noMatchdays: "Enter the number of matchdays for this competition",
    noFirstMatch: "Enter the first matchday of this competition",
    negativeMatchdays: "Must be a positive number",
    invalidMatchdays: "Must be between 1 and 38",
    lastMatchBeforeFirstMatch: "The last matchday cannot be before the first",
    competitionFormat: "Select competition format",
    season: "Regular season",
    singleElimination: "Single elimination tournament",
    doubleElimination: "Double elimination tournament",
    roundRobin: "Round Robin tournament",
    general: "General info",
    calendar: "Calendar",
    bonuses: "Bonuses",
    teams: "Teams",
    numberOfTeams: "Number of teams in the competition",
    goals: "Goals"
  },
  it: {}
});

export default StringsNewCompetition;
