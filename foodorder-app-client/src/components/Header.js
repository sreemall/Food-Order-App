import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../userLoginSlice";

console.log ("999  before Entering Header");

const Header = () => {
    // console.log ("999  Entering Header");
    const dispatch = useDispatch ();
    const userLogin = useSelector ((state) => state.login);
    const userInfo = userLogin.userInfo;
    // console.log ("Header -- userInfo", userLogin, userInfo);

    const navigate = useNavigate ();

    const handleUserProfile = (e) => {
        e.preventDefault ();
        navigate ("/profile");
    }

    const handleAdminDashboard = (e) => {
        e.preventDefault();
        // console.log ("999 Header navigate to AdminPage");
        navigate ("/admin");
    }

    const handleLogin = (e) => {
        e.preventDefault ();
        navigate ("/login");
    }

    const handleSignOut = (e) => {
        e.preventDefault ();
        dispatch (logout());
    }

    useEffect (() => {
        console.log ("999 HEADER useEffect userInfo=", userInfo)
        if (!userInfo) {
            console.log ("999 HEADER useEffect navigate to login")
            navigate ("/login");
        }
        else if (userInfo && userInfo.isAdmin) {
            console.log ("999 HEADER useEffect navigate to admin")
            navigate ("/admin");
        }
        else {
            console.log ("999 HEADER useEffect navigate to homepage")
            navigate ("/")
        }
    }, []);

    return (
        <header>
            <Navbar
                bg="info"
                navbar="light"
                variant="dark"
                expand="lg"
                collapseOnSelect
            >
                <Container>
                    <Nav.Link>
                        <Navbar.Brand>Food Order APP</Navbar.Brand>
                    </Nav.Link>    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {userInfo  && !userInfo.isAdmin && (
                                <Nav.Link>
                                    <i className="bi bi-cart"> Cart </i>
                                </Nav.Link>
                            )}
                            {userInfo && !userInfo.isAdmin && (
                                <Nav.Link>
                                    <i className="bi bi-bucket-fill"> Orders </i>
                                </Nav.Link>
                            )}
                            {userInfo && (
                                <Nav.Link onClick={handleUserProfile}>
                                    <i className="bi bi-bucket-fill">Profile</i>
                                </Nav.Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <Nav.Link onClick={handleAdminDashboard}>
                                    <i className="bi bi-gear"> AdminDashboard</i>
                                </Nav.Link>
                            )}
                            {!userInfo && (
                                    <Nav.Link onClick={handleLogin}>
                                        <i className="bi bi-box-arrow-in-right">Log In</i>
                                    </Nav.Link>
                            )}
                            {userInfo && (
                                <Nav.Link onClick={handleSignOut}>
                                    <i className="bi bi-box-arrow-in-right"> Sign Out</i>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>                
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;