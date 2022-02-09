import {ThemeProvider} from 'styled-components';
import defaultTheme from 'commons/style/themes/default';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';
import ROUTES from 'commons/constants/routes';

import LoginLocal from './pages/Login/LoginLocal';
import AuthService from './apis/AuthService';
import React, {useEffect, useState} from 'react';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {ACCESS_TOKEN_NAME} from './types/AuthModel';
import {Header} from './stories/Header';
import GridRecord from 'grid';

//import styles from './App.module.css';
//import Header from './components/layout/Header';
//import Footer from './components/layout/Footer';
//import LoginSocial from './pages/Login/LoginSocial';
//import NotFound from './components/common/NotFound';
//import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler';
//import Login from './containers/Login';
// import PrivateRoute from './pages/Login/PrivateRoute';
// import Profile from './components/auth/Profile';
// import {Login, NotFound} from './pages';
// import Main from './pages/Main';
// import historyRecord from 'grid';

//export type TAuthservice = AuthService;

export interface IAppProps {
  authService: AuthService;
}

const App = ({authService}: IAppProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const loadCurrentlyLoggedInUser = () => {
    authService
      .getCurrentUser()
      .then((response) => {
        setCurrentUser(response || null);
        setAuthenticated(true);
      })
      .catch((error) => {});
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    setCurrentUser(null);
    setAuthenticated(false);
    Alert.success("You're safely logged out!");
  };

  // useEffect(() => {
  //   loadCurrentlyLoggedInUser();
  // }, [loadCurrentlyLoggedInUser]);

  // @ts-ignore
  return (
    <ThemeProvider theme={defaultTheme}>
      <Normalize />
      <GlobalStyles />
      {/*<div className={styles.app}>*/}
      <BrowserRouter>
        {/*<Header />*/}

        <Routes>
          <Route path="/" element={<LoginLocal authService={authService} />} />
          <Route path="/grid" element={<GridRecord />} />
          {/*<Route path={ROUTES.MAIN} element={<Main />} />*/}
          <Route
            path={ROUTES.MAIN}
            element={
              <Header
                user={{currentUser}}
                onLogin={loadCurrentlyLoggedInUser}
                onLogout={handleLogout}
                onCreateAccount={() => {}}
              />
            }
          />
          {/*<PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser} element={Profile} />*/}
          {/*<Route path="/oauth2/redirect/*" element={<OAuth2RedirectHandler />} />*/}
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
        {/*<Footer />*/}
      </BrowserRouter>
      <Alert stack={{limit: 3}} timeout={3000} position="top-right" effect="slide" offset={65} />
      {/*</div>*/}
    </ThemeProvider>
  );
};

export default App;
