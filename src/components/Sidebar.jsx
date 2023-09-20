// import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTabs from "./NavTabs";

const Sidebar = () => {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <Container fluid className="wrapper h-100">
            <Header className="header" />
            <Row className="h-100">
                <Col xs={1} className="d-flex flex-row align-items-start">
                    <NavTabs />
                </Col>
                <Col className="d-flex justify-content-center align-items-center text-truncate">
                    <Outlet />
                </Col>
            </Row>
        </Container>
        // <Container>
        //     {/* <Header
        //         show={show}
        //         handleClose={handleClose}
        //         handleShow={handleShow}
        //     /> */}
        //     <Outlet />
        //     {/* <Footer /> */}
        // </Container>
    );
};

export default Sidebar;
