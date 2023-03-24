// Display User Profile at top of page 

import { Container, Row, Col } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 


const Profile = () => {
    const [profile, setProfile] = useState(""); 
    

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        API.get("profiles/6")
            .then((res) => {
                setProfile(res.data);
            })
            .catch(console.error);
    };
    
    return (

        <Container className="w-75 mt-4">
            <Row>
                <Col>
                    <h3 className="display-3 text-secondary text-center">
                        {profile.title}
                    </h3>
                    <br />
                    <p className="text-secondary text-center">
                        {profile.description}
                    </p>
                </Col>
            </Row>
        </Container>
    )
};

export default Profile; 