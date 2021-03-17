import React from 'react';
import Routes from './Routes'
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';


export default () => {

  const history = createMemoryHistory();

  return <div>
    <Switch>
      {/* {routes.map(route => (
          <Route {...route} />
        ))} */}
      {renderRoutes(Routes)}
    </Switch>
  </div>


  // return <BrowserRouter>
  //   <Switch>
  //     {/* <Route path="/" exact component={Layout}></Route>
  //     <Route path={'/spacexdetails/:id'} exact component={SpaceXdetails} /> */}

  //     {routes.map(route => (
  //       <Route exact {...route} />
  //     ))}
  //   </Switch>
  // </BrowserRouter>
};