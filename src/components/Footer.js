import { Container, Row, Col, Nav } from 'react-bootstrap'; 
import DanLogo from "../logo.png"; 
import API from '../API';
import { useState, useEffect } from 'react'; 
import { AiFillLinkedin } from 'react-icons/ai'; 
import { FaGithub } from 'react-icons/fa'; 
import { AiOutlineCopyright } from 'react-icons/ai'; 


const Footer = () => {
    const [currentInfo, setCurrentInfo] = useState("");
    const [git, setGit] = useState([]); 
    const [linked, setLinked] = useState([]);

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

    useEffect(() => {
        getLinks();
    }, []);

    const getLinks = () => {
        API.get("websites/1/")
            .then((res) => {
                setGit(res.data);
            })
            .catch(console.error); 
        
        API.get("websites/2/") 
            .then((res) => {
                setLinked(res.data);
            })
            .catch(console.error); 
    };


    return (
        <footer className="site-footer text-secondary border-top border-muted pt-3">
            <Container>
                <Row>
                    <Col className="text-start">
                        <a href={git.url} class="footer-link" target="_blank" rel="noopener noreferrer"> 
                            <FaGithub />
                        </a>
                        <a href={linked.url} class="footer-link" target="_blank" rel="noopener noreferrer">
                            <AiFillLinkedin />
                        </a>
                    </Col>
                    <Col>
                        <Nav.Link href="#top-page-container">
                        <img 
                            src={DanLogo}
                            height="25"
                            width="25"
                            alt="DG Logo"
                        /></Nav.Link>{' '}
                        <AiOutlineCopyright /> 2023 
                    </Col>
                    <Col className="text-end">
                        <h6 className="text-secondary">
                            Contact
                        </h6>
                        <address> 
                            <a href="mailto:{currentInfo.email}" class="email-link">{currentInfo.email}</a>
                            <br />
                            <p>
                                {currentInfo.street}
                                <div>{currentInfo.city}, {currentInfo.state}, {currentInfo.postal}</div>
                            </p>
                        </address>
                    </Col>
                </Row>
            </Container>
        
        </footer>
    )
};

export default Footer; 