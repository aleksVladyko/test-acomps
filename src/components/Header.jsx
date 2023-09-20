import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
const Header = () => {
  
   return (
    <Container className='header ' ><Row>
    <Nav variant="underline" defaultActiveKey="/home" >
        <Col>
<Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
        </Col>
        <Col>
        <Nav.Item>
      <Nav.Link eventKey="link-1">Option 2</Nav.Link>
    </Nav.Item>
        </Col>
        <Col>
        <Nav.Item>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav.Item>
        </Col>
    
    
    
  </Nav>
 </Row></Container> );
};
export default Header;