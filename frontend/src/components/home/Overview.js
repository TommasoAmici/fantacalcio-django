import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { StringsDashboard, StringsDate } from "../../localization/Strings";

function formatDateSingularPlural(date, stringSingular, stringPlural) {
  if (date === 1) {
    return date + " " + stringSingular;
  } else {
    return date + " " + stringPlural;
  }
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      // to be grabbed from server
      nextMatchDay: moment("2018-06-08 15:00")
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment()
    });
  }

  render() {
    const diff = this.state.nextMatchDay.diff(this.state.date);
    return (
      <div>
        <h1>{StringsDashboard.overview}</h1>
        <h3>{StringsDashboard.countdown}</h3>
        <h2>
          {formatDateSingularPlural(
            moment.utc(diff).format("D"),
            StringsDate.day,
            StringsDate.days
          )},{" "}
          {formatDateSingularPlural(
            moment.utc(diff).format("H"),
            StringsDate.hour,
            StringsDate.hours
          )},{" "}
          {formatDateSingularPlural(
            moment.utc(diff).format("m"),
            StringsDate.minute,
            StringsDate.minutes
          )},{" "}
          {formatDateSingularPlural(
            moment.utc(diff).format("s"),
            StringsDate.second,
            StringsDate.seconds
          )}.
        </h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Overview);
