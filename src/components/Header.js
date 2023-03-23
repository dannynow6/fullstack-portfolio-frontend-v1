import { Container, Navbar } from 'react-bootstrap'; 
import DanLogo from "../logo.png"; 
const Header = () => {

    

    return (
        <Navbar bg="light">
            <Container>
                <img 
                    src={DanLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="DG Logo"
                />
            </Container>
        </Navbar>
    )
};

export default Header; 