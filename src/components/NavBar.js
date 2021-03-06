import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import { Typography } from "@material-ui/core";

function UserAvatar(props) {
  // If a user avatar is available, return an img tag with the pic
  if (props.user.avatar) {
    return (
      <img
        src={props.user.avatar}
        alt="user"
        className="rounded-circle align-self-center mr-2"
        style={{ width: "32px" }}
      ></img>
    );
  }

  // No avatar available, return a default icon
  return (
    <span>
    <i
      className="far fa-user-circle fa-2x rounded-circle align-self-center mr-2"
      style={{ width: "32px" }}
    ></i>
    </span>
  );
}

function AuthNavItem(props) {
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  if (props.isAuthenticated) {
    return (
      <UncontrolledDropdown>
        <DropdownToggle nav caret className='text-white'>
          <UserAvatar user={props.user} />
        </DropdownToggle>
        <DropdownMenu right>
          <h5 className="dropdown-item-text mb-0">{props.user.displayName}</h5>
          <p className="dropdown-item-text text-muted mb-0">
            {props.user.email}
          </p>
          <DropdownItem divider />
          <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  // Not authenticated, return a sign in link
  return (
    <NavItem>
      <NavLink onClick={props.authButtonMethod}>Sign In</NavLink>
    </NavItem>
  );
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    // Only show calendar nav item if logged in
    let calendarLink = null;
    if (this.props.isAuthenticated) {
      calendarLink = (
        <NavItem>
          <RouterNavLink to="/calendar" className="nav-link text-white" exact style={{ fontFamily: 'Source Sans Pro', fontSize: '1.2rem'}}>
            Calendar
          </RouterNavLink>
        </NavItem>
      );
    }

    return (
      <div>
        <Navbar style={{ backgroundColor: "#6a1b9a" }} expand="md" fixed="top">
          <Container>
            <NavbarBrand href="/" className="text-white" style={{ fontFamily: 'Pacifico'}}>
              <Typography noWrap style={{ fontFamily: 'Pacifico', fontSize: '1.3rem'}}>
              Class Space
              </Typography>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <RouterNavLink to="/" className="nav-link text-white" exact style={{ fontFamily: 'Source Sans Pro', fontSize: '1.2rem'}}>
                    Home
                  </RouterNavLink>
                </NavItem>
                {calendarLink}
              </Nav>
              <Nav className="justify-content-end" navbar>
                <NavItem>
                  <NavLink
                    href="https://developer.microsoft.com/graph/docs/concepts/overview"
                    target="_blank"
                    className="text-white"
                    style={{ fontFamily: 'Source Sans Pro', fontSize: '1.2rem'}}
                  >
                    <i className="fas fa-external-link-alt mr-1 text-white" ></i>
                    Docs
                  </NavLink>
                {/* <p className="dropdown-item-text mb-0"></p> */}
                </NavItem>
                <NavItem
                className='text-white'
                style={{ fontFamily: 'Source Sans Pro', fontSize: '1.2rem', marginTop: '0.5rem', marginLeft: '0.5rem'}}
                >
                {this.props.user.displayName}
                </NavItem>
                <AuthNavItem
                  isAuthenticated={this.props.isAuthenticated}
                  authButtonMethod={this.props.authButtonMethod}
                  user={this.props.user}
                />

              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
