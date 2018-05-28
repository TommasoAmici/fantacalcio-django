import React from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardTextIcon, ClipboardCheckIcon } from "mdi-react";

class LeagueCreated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: "",
      copied: false
    };
    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.setState({ copied: true });
  }
  componentWillMount() {
    this.setState({ accessCode: this.props.accessCode });
  }
  render() {
    const { leagueName } = this.props;
    const { accessCode, copied } = this.state;
    return (
      <div>
        <h1>{leagueName}</h1>
        <p>You can use this access code to invite your friends:</p>
        <div className="uk-card uk-card-default uk-card-body">
          <div className="uk-inline uk-width-1-1">
            <input
              className="uk-input"
              type="text"
              value={accessCode}
              readonly
            />
            <CopyToClipboard text={this.state.accessCode} onCopy={this.onCopy}>
              <a className="uk-form-icon uk-form-icon-flip no-underline">
                {copied === true ? (
                  <ClipboardCheckIcon />
                ) : (
                  <ClipboardTextIcon />
                )}
              </a>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leagueName: state.league.content.name,
    accessCode: state.league.content.access_code
  };
}

export default connect(mapStateToProps, {})(LeagueCreated);
