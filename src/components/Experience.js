import { Container, Card, ListGroup } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 
import { HiArrowSmRight } from 'react-icons/hi'; 

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        getExperiences();
    }, []);

    const getExperiences = () => {
        API.get("experiences/")
            .then((res) => {
                setExperiences(res.data);
            })
            .catch(console.error);
    };

    return (
        <Container className="w-75 mt-3">
            <div className="row mb-3">
                <div>
                    <h6 className="display-6 text-center text-secondary">Experience</h6>
                </div>
            </div>
            <div className="row flex-nowrap overflow-auto">
                {experiences.map((experience, index) => {
                    return (
                        <div className="col-sm-5">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{experience.position}</Card.Title>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                {experience.employer_name}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                {experience.start_date}{' '}<HiArrowSmRight />{' '}{experience.end_date}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                {experience.description} 
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
};

export default Experience; 