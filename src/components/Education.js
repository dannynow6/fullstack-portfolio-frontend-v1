import { Container, Card, ListGroup } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 

const Education = () => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        getEducation();
    }, []);

    const getEducation = () => {
        API.get("education/")
            .then((res) => {
                setEducations(res.data);
            })
            .catch(console.error);
    };

    return (
        <Container className="w-75 mt-3" id="education-container">
            <div className="row mb-3">
                <div>
                    <h6 className="display-6 text-center text-secondary">Education</h6>
                </div>
            </div>
            <div className="row flex-nowrap overflow-auto">
                {educations.map((education, index) => {
                    return (
                        <div className="col-sm-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {education.school_name}
                                    </Card.Title>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                Degree: {education.degree_earned}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                {education.date_started} - {education.date_completed}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>{education.accolades}</Card.Footer>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
};

export default Education; 