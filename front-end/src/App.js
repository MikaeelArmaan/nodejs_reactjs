import './App.css';
import Navbar from './components/layout/Navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import { Provider } from "react-redux";
import store from './store';
import PrivateRoute from './components/routing/PrivateRoute';
import DocumentForm from './components/DocumentForm/DocumentForm';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { AUTH_ERROR } from './actions/types';
import Profile from './components/layout/Profile/Profile';
import AdminRoute from './components/routing/AdminRoute';
import Alert from './components/layout/Alert/Alert';
import Loading from './components/layout/Loading/Loading';
import SwitchWrapper from './components/layout/SwitchWrapper/SwitchWrapper';
import Orders from './components/Orders/Orders';


if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      store.dispatch(loadUser(token));
    } else {
      store.dispatch({ type: AUTH_ERROR });
    }
  }, [])

  return (
    <>
      <Provider store={store}>
        <Router>
          <Loading />
          <Alert />
          <Navbar />
            <SwitchWrapper>
              <>
                <Profile />
                <Switch>
                  <Route path="/login" component={Login} exact />
                  <PrivateRoute path="/" component={Dashboard} exact />
                <PrivateRoute path="/add-document" component={DocumentForm} />
                <PrivateRoute path="/orders" component={Orders} />
                </Switch>
              </>
            </SwitchWrapper>
        </Router>
      </Provider>
    </>
  );
}

export default App;
