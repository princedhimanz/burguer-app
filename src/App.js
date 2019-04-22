import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const App = ({ authCheckState, isAuth }) => {
  useEffect(() => {
    authCheckState();
  }, []);

  return (
    <Layout>
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          {isAuth ? <Route path="/checkout" component={Checkout} /> : null}
          {isAuth ? <Route path="/orders" component={Orders} /> : null}
          {isAuth ? <Route path="/logout" component={Logout} /> : null}
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurguerBuilder} />
          <Redirect to="/" />
        </Switch>
      </React.Suspense>
    </Layout>
  );
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
