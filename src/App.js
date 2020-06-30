import React, { Fragment } from 'react';
import './App.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import ZonesIndia from './components/ZonesIndiaComponent';
import Precautions from './components/PrecautionsComponent';
import Donate from './components/DonateComponent';
import Helpline from './components/HelplineComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';


function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Container style={{ "min-height" : "75vh"}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/zones" component={ZonesIndia} />
            <Route exact path="/precautions" component={Precautions} />
            <Route exact path="/donate" component={Donate} />
          </Switch>
        </Container>
        <Helpline />
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
