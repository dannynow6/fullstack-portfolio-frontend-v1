import { Container, ListGroup, Card } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 

const Project = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        API.get("projects/")
            .then((res) => {
                setProjects(res.data);
            })
            .catch(console.error);
    };

    return (
        <Container className="w-75 mt-3">
            <div className="row mb-3">
                <div>
                    <h6 className="display-6 text-center text-secondary">Projects</h6>
                </div>
            </div>
            <div className="row flex-nowrap overflow-auto">
                {projects.map((project, index) => {
                    return (
                        <div className="col-sm-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{project.title}</Card.Title>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                Created with: {project.tech_used}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                {project.description}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <a class="item-nav-link" href={project.git_repo} target="_blank" rel="noopener noreferrer">{project.git_repo}</a>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </div>
                    );
                })}
            </div>
        </Container>
    )

};

export default Project; 