import { Container, Row, Col } from 'react-bootstrap'; 

const Header = () => {
    return (
        <Container className="w-75 m-2">
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1 className="display-2">
                        Danny's Portfolio 
                    </h1>
                </Col>
            </Row>
        </Container>
    )
};

export default Header; 