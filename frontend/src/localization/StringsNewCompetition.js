import LocalizedStrings from "react-localization";
const StringsNewCompetition = new LocalizedStrings({
  en: {
    title: "Create a new competition",
    noName: "Enter a name for your competition",
    button: "New competition",
    name: "Competition name",
    invalidName: "Must be 40 characters or fewer",
    matchdays: "Number of matchdays",
    noMatchdays: "Enter the number of matchdays for this competition",
    negativeMatchdays: "Must be a positive number",
    invalidMatchdays: "Must be between 1 and 38",
    competitionFormat: "Select competition format",
    season: "Regular season",
    singleElimination: "Single elimination tournament",
    doubleElimination: "Double elimination tournament",
    roundRobin: "Round Robin tournament"
  },
  it: {}
});

export default StringsNewCompetition;
