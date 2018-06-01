import React, { Component } from "react";
import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    title: "Page Not Found",
    text: "I'm sorry, the page you were looking for cannot be found!"
  },
  it: {
    title: "Pagina non disponibile",
    text: "La pagina che cercavi non è stata trovata."
  }
});

class PageNotFound extends Component {
  render() {
    return (
      <div className={"uk-flex-center uk-position-center login-form"}>
        <h1>{strings.title}</h1>
        <p>{strings.text}</p>
      </div>
    );
  }
}
export default PageNotFound;
