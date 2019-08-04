import React from "react";
import ContainedButtons from "./Components/ContainedButtons/ContainedButtons";
import SimpleAppBar from "./Components/SimpleAppBar/SimpleAppBar";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SimpleAppBar />
        <ContainedButtons />
      </React.Fragment>
    );
  }
}

export default App;
