import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import BusinessPage from './components/businessPage';
import CreateBusiness from './components/createBusiness';
import { getAllBusinessThunk } from './store/business';
import BusinessList from './components/businessList'
import HomePage from './components/HomePage'
import Footer from "./components/Footer";
import Banner from "./components/Banner"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(getAllBusinessThunk());
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/business/create' exact={true}>
          <CreateBusiness/>
        </ProtectedRoute>
        <ProtectedRoute path='/business/:id'>
          <BusinessPage/>
        </ProtectedRoute>
        <Route path='/business'>
          <BusinessList/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
