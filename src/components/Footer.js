import { Container, Row, Col, Nav } from 'react-bootstrap'; 
// import DanLogo from "../logo.png"; 
import API from '../API';
import { useState, useEffect } from 'react'; 
import { AiFillLinkedin } from 'react-icons/ai'; 
import { FaGithub } from 'react-icons/fa'; 


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
        <footer className="site-footer text-center text-secondary">
            
                <Nav.Item>
                    <Nav.Link href={git.url}>
                        <FaGithub />
                    </Nav.Link>
                    <Nav.Link href={linked.url}>
                        <AiFillLinkedin />
                    </Nav.Link>
                </Nav.Item>
                <Col>
                    {currentInfo.first_name}
                </Col>
        
        </footer>
    )
};

export default Footer; 