import React from "react";
import {Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    console.log ("999 Entering Footer");
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="py-4 text-center">
                        Sridevi Mallela
                    </Col>
                
                </Row>
            
            </Container>
            
        </footer>
    );
};
export default Footer;