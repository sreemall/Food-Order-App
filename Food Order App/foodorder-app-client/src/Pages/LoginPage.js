import React, { useState } from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../userLoginSlice";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import AlertMessage from "../components/AlertMessage";


// console.log ("999 before Entering LoginPage");
const LoginPage = () => {
    console.log ("999 Entering LoginPage");
    
    const [username, setUserName] = useState ("");
    const [password, setPassword] = useState ("");
    const dispatch = useDispatch ();
    const navigate = useNavigate ();
    

    const handleUsernameChange = (e) => {
        e.preventDefault ();
        setUserName (e.target.value);
    }
    const handlePasswordChange = (e) => {
        e.preventDefault ();
        setPassword (e.target.value);
    }

    const userLogin = useSelector ((state) => state.login);
    const {loading, success, error, userInfo} = userLogin;
    console.log ("Login Page userLogin=", userLogin, userInfo);

    const handleSubmit = (e) => {
        e.preventDefault ();
        dispatch (login(username, password));
    }

    useEffect (() => {
        // console.log ("999 LoginPage useEffect userInfo=", userInfo)
        if (userInfo && userInfo.isAdmin){
            // console.log ("LoginPage useEffect navigate to admin" )
            navigate ("/admin");
        }
        else if (userInfo) {
            // console.log ("LoginPage useEffect navigate to homepage")
            navigate ("/");
        }
    });

    return (
        <>
            {loading && <Spinner animation="grow" />}
            {success && <AlertMessage variant="info" message="Login Successful" />}
            {error && <AlertMessage variant="danger" message="error" />}
            <FormGroup className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="txt" id="username" placeholder="Username"
                    onChange={handleUsernameChange}
                />
            </FormGroup>
            <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control type="txt" id="password" placeholder="Password"
                    onChange={handlePasswordChange}
                />
            </FormGroup>
            <Button className="mb-3" variant="primary" type="submit" onClick={handleSubmit}>
                Login
            </Button>
        </>
    )
}

export default LoginPage;