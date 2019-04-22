import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = ({ authCheckState, isAuth }) => {
  console.log(isAuth);
  useEffect(() => {
    authCheckState();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurguerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth.token !== null,
});

const mapDispatchToProps = {
  authCheckState: actions.authCheckState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
