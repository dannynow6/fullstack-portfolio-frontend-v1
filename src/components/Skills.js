import { Container, Card } from 'react-bootstrap'; 
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

    return (
        <Container className="w-75 mt-3" id="skills-container">
            <div className="row mb-3">
                <div>
                    <h6 className="display-6 text-center text-secondary">Skills</h6>
                </div>
            </div>
            <div className="row flex-nowrap overflow-auto">
                {skills.map((skill, index) => {
                    return (
                        <div className="col-md-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {skill.name}
                                    </Card.Title>
                                    <Card.Text>
                                        Level: {skill.level}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>Type: {skill.type}</Card.Footer>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
};

export default Skills; 