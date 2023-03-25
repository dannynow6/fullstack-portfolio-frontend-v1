import { useState, useEffect } from 'react'; 
import { Container, Navbar, Nav } from 'react-bootstrap'; 
import DanLogo from "../logo.png"; 
import API from '../API';

const Header = () => {
    const [currentInfo, setCurrentInfo] = useState([]);

    useEffect(() => {
        getMyInfo();
    }, []);

    const getMyInfo = () => {
        API.get("myinfo/1/")
            .then((res) => {
                setCurrentInfo(res.data);
            })
            .catch(console.error);
    };

    return (
        <Navbar bg="light" className="shadow-lg rounded">
            <Container>
                <Navbar.Brand >
                    <img 
                        src={DanLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="DG Logo"
                    />{' '}
                    {currentInfo.first_name} {currentInfo.last_name}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#scrollspyProflie">Profile</Nav.Link>
                    <Nav.Link href="#scrollspySkill">Skills</Nav.Link>
                    <Nav.Link href="#scrollspyEducation">Education</Nav.Link>
                    <Nav.Link href="#scrollspyExperience">Experience</Nav.Link>
                    <Nav.Link href="#scrollspyProjects">Projects</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
};

export default Header; 