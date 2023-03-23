import { Container, Row, Col } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = () => {
        API.get("skills/")
            .then((res) => {
                setSkills(res.data);
            })
            .catch(console.error);
    };

    
}