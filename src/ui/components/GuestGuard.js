import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {INDEX_ROUTE} from "../../Router";

function GuestGuard({ children }) {
  const uid = useSelector((state) => state.firebase?.auth?.uid);

  if (uid) {
    return <Redirect to={INDEX_ROUTE} />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.any
};

export default GuestGuard;
