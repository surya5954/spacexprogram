import React from 'react';
// import Home from './Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SpaceXdetails from './Components/SpaceXdeatils/SpaceXdetails';
import Layout from './Layout';

export default () => {
  return <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Layout}></Route>
        <Route path={'/spacexdetails/:id'} exact component={SpaceXdetails} />
      </Switch>
    </div>
  </BrowserRouter>
  // return <div>
  //   <Layout />
  // </div>
};