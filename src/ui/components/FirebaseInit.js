import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from './SplashScreen';
import {useFirebaseConnect} from "react-redux-firebase";

function FirebaseInit({ children }) {
  useFirebaseConnect();

  let isInitializingFirebase = useSelector((state) => state.firebase.isInitializing);
  let isInitializingAuth = !useSelector((state) => state.firebase.auth.isLoaded);
  let isInitializingProfile = !useSelector((state) => state.firebase.profile.isLoaded);


  if (isInitializingFirebase || isInitializingAuth || isInitializingProfile) {
    return <SplashScreen />;
  }

  return children;
}

FirebaseInit.propTypes = {
  children: PropTypes.any
};

export default FirebaseInit;
