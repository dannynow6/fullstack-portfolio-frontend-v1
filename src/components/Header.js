import { useState, useEffect } from 'react'; 
import { Container, Navbar } from 'react-bootstrap'; 
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
        <Navbar bg="light">
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
            </Container>
        </Navbar>
    )
};

export default Header; 