import React, { Fragment } from 'react';
import './App.css';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Helpline from './components/HelplineComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { list } from './resources/sidenav';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <Fragment>
      <Router>
        <ScrollToTop />
        <Header />
        <Container style={{ "minHeight" : "75vh"}}>
          <Switch>
            {
              list.map((element) => {
                return (<Route key={element.url} exact path={element.url} component={element.component}/>);
              })
            }
          </Switch>
        </Container>
        <Helpline />
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
