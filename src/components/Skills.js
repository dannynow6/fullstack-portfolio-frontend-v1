import { Container, Card, Button, Form, Modal, ListGroup } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 



const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");
    const [skillId, setSkillId] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName("");
        setLevel("");
        setType(""); 
    };

    const handleShow = () => setShow(true); 

    useEffect(() => {
        refreshSkills();
    }, []);

    const refreshSkills = () => {
        API.get("skills/")
            .then((res) => {
                setSkills(res.data);
            })
            .catch(console.error);
    };

    
    const onSubmit = (e) => {
        e.preventDefault();
        let item = { name, level, type };
        API.post("skills/", item).then(() => refreshSkills()); 
        setName("");
        setLevel("");
        setType(""); 
    };

    const onUpdate = (id) => {
        let item = { name, level, type };
        API.put(`skills/${id}/`, item).then((res) => refreshSkills());
        setName("");
        setLevel("");
        setType(""); 
    };

    const onDelete = (id) => {
        API.delete(`skills/${id}/`).then((res) => refreshSkills());
    }; 

    function selectSkill(id) {
        let item = skills.filter((skill) => skill.id === id)[0];
        setName(item.name);
        setLevel(item.level);
        setType(item.type);
        setSkillId(item.id); 
    }

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
                                        <ListGroup>
                                            <ListGroup.Item>
                                                Level: {skill.level}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Type: {skill.type}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="float-right">
                                        <Button 
                                            variant="outline-secondary"
                                            size="sm"
                                            type="button"
                                            onClick={() => selectSkill(skill.id)}
                                            className="d-inline m-2"
                                        >
                                            Select
                                        </Button>
                                        <Button 
                                            variant="outline-danger"
                                            size="sm"
                                            type="button"
                                            onClick={() => onDelete(skill.id)}
                                            className="d-inline m-2"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update Skill
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Skill</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form id="formSkill" onSubmit={onSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>{skillId} Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Skill Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLevel">
                                    <Form.Select 
                                        id="selectLevel"
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                        <option>Skill Level</option>
                                        <option value="advanced">advanced</option>
                                        <option value="familiar">familiar</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicType">
                                    <Form.Select 
                                        id="selectType"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)} 
                                    >
                                        <option>Skill Type</option>
                                        <option value="hard">hard</option>
                                        <option value="soft">soft</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="float-right">
                                    <Button 
                                        variant="outline-success"
                                        type="submit"
                                        onClick={onSubmit}
                                        className="mx-2"
                                    >Save</Button>
                                    <Button 
                                        variant="outline-primary"
                                        type="button"
                                        onClick={() => onUpdate(skillId)}
                                        className="mx-2"
                                    >Update</Button>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-danger" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </Container>
    )
};

export default Skills; 