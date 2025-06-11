import {useSelector} from "react-redux";
import {Form, Container, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AlertMessage from "../components/AlertMessage";


const UserProfilePage = () => {

    const login = useSelector ((state) => state.login);

    const userInfo = login.userInfo;

    useEffect (() => {
        console.log ("222 UseEffect in UserProilePage", login)
        if (!userInfo) {
            navigate ("/login");
        }
    }, []);

    const [username, setUserName] = useState ((userInfo) ? userInfo.username : "");
    const [fullname, setFullName] = useState ((userInfo) ? userInfo.fullname : "");
    const [email, setEmail] = useState ((userInfo) ? userInfo.email : "");
    const [password, setPassword] = useState ("");
    const [confirmPassword, setConfirmPassword] = useState ("");
    const [error, setError] = useState ("");
    const [success, setSuccess] = useState ("");

    const navigate = useNavigate ();

    const handleConfirmPasswordChange = (e) => {
        
    }

    const updateUserInfo = (e) => {
        e.preventDefault ();
        if (password !== confirmPassword) {
            setSuccess ("");
            setError ("Password and Confirm Password should match");
        }
        else {
            userInfo.fullname = fullname;
            userInfo.email = email;
            userInfo.password = password;
            setError ("");
            setSuccess ("User details updated successfully");
        }

    }

    return (
        <>
            {error && <AlertMessage variant="danger" message={error} />}
            {success && <AlertMessage variant="success" message={success} />}
            <Container>    
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type="text"  disabled placeholder= "username"
                            value={username} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Full Name </Form.Label>
                        <Form.Control type="text" placeholder="Full Name"
                            value={fullname} onChange= {(e) => setFullName (e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type="email" placeholder="Email"
                            value={email} onChange= {(e) => setEmail (e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Password </Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={password} onChange= {(e) => {setError(""); setPassword (e.target.value)}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Confirm Password </Form.Label>
                        <Form.Control type="password" placeholder="Cofirm Password"
                            value={confirmPassword} onChange= {(e) => {setError (""); setConfirmPassword (e.target.value)}} />
                    </Form.Group>
                </Form>
                <Button type="submit" variant="info" className="mb-3" onClick={updateUserInfo}>
                    Update User
                </Button>
            </Container>
        </>
    )
}

export default UserProfilePage;