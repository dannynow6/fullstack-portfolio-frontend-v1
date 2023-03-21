import { useState, useEffect } from "react"; 
import { Button, Form, Modal } from 'react-bootstrap'; 
import API from "./API"; 

// title, tech_used, description (use textarea), git_repo (needs to be full url)

const AddProject = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [tech_used, setTechUsed] = useState("");
    const [description, setDescription] = useState("");
    const [git_repo, setGitRepo] = useState("");
    const [projectId, setProjectId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTitle("");
        setTechUsed("");
        setDescription("");
        setGitRepo("");
    };
    
    const handleShow = () => setShow(true); 

    useEffect(() => {
        refreshProjects();
    }, []);

    const refreshProjects = () => {
        API.get("projects/")
            .then((res) => {
                setProjects(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { title, tech_used, description, git_repo };
        API.post("projects/", item).then(() => refreshProjects());
        setTitle("");
        setTechUsed("");
        setDescription("");
        setGitRepo(""); 
    };

    const onUpdate = (id) => {
        let item = { title, tech_used, description, git_repo };
        API.put(`projects/${id}/`, item).then((res) => refreshProjects());
        setTitle("");
        setTechUsed("");
        setDescription("");
        setGitRepo(""); 
    };

    const onDelete = (id) => {
        API.delete(`projects/${id}/`).then((res) => refreshProjects());
    };

    function selectProject(id) {
        let item = projects.filter((project) => project.id === id)[0];
        setTitle(item.title);
        setTechUsed(item.tech_used);
        setDescription(item.description);
        setGitRepo(item.git_repo);
        setProjectId(item.id);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update Project
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Label>{projectId} Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Project Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicTechUsed">
                                    <Form.Label>Tech Used</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter Tech Used"
                                        value={tech_used}
                                        onChange={(e) => setTechUsed(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicGitRepo">
                                    <Form.Label>Git Repo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Git Repo URL"
                                        value={git_repo}
                                        onChange={(e) => setGitRepo(e.target.value)}
                                    />
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
                                        onClick={() => onUpdate(projectId)}
                                        className="mx-2"
                                    >Update</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-danger" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                    <div className="col-md-8 m">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Tech Used</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Git Repo</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => {
                                    return (
                                        <tr key="">
                                            <th scope="row">{project.id}</th>
                                            <td>{project.title}</td>
                                            <td>{project.tech_used}</td>
                                            <td>{project.description}</td>
                                            <td><a class="item-nav-link" href={project.git_repo} target="_blank" rel="noopener noreferrer">{project.git_repo}</a></td>
                                            <td>
                                                <Button 
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={() => selectProject(project.id)}
                                                    className="d-inline mt-2"
                                                >
                                                    Select
                                                </Button>
                                                <Button 
                                                    variant="outline-danger"
                                                    size="sm"
                                                    type="button"
                                                    onClick={() => onDelete(project.id)}
                                                    className="d-inline mt-5"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                
            </div>
        </div>
    );

};

export default AddProject; 