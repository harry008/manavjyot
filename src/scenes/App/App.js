import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import Logo from './logo.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false
    };
  }

  render() {
    return (
        <div>
          <AppBar
            title="Manav Jyot Charity"
            onLeftIconButtonTouchTap={() => this.setState({ open: true }) }
          />
          <div>
            { this.props.children }
          </div>
          <Drawer open={this.state.open}>
              <AppBar
                  title="Menu"
                  iconElementLeft={<IconButton onTouchTap={() => this.setState({ open: false }) }><NavigationClose /></IconButton>}
                  />
              <Divider />
              <MenuItem>
                  <Link to="/">
                    Home
                  </Link>
              </MenuItem>
              <Divider />
               <MenuItem>
                <Link to="/volunteers">
                  Volunteers
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link to="/campaigns">
                  Campaigns
                </Link>
              </MenuItem>
              <Divider />

              <MenuItem>
                <Link to="/donation">
                  Donations
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link to="/contact">
                  Contact us
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link to="/about">About us</Link>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>
          </Drawer>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
