import React, { useState } from "react";
import SimpleAppBar from "./Components/SimpleAppBar/SimpleAppBar";
import SimpleCard from "./Components/SimpleCard/SimpleCard";
import Grid from "@material-ui/core/Grid";
import FormSection from "./Components/FormSection/Form";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SimpleAppBar />
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormSection />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SimpleCard />
            </Grid>
          </Grid>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
