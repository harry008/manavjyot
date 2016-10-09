import React, { PropTypes } from 'react';
import './Navigation.scss';

const Navigation = (props) => {
  return (
    <nav id="navbar" className="flex-nav">
      { props.children }
    </nav>
  );
};

Navigation.propTypes = {
  children: PropTypes.object
};

export default Navigation;
