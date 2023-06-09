import { useState, useEffect } from "react"; 
import { Button, Form, Modal } from 'react-bootstrap'; 
import API from "./API"; 

// name, url (needs to be full url), description 

const AddWebsite = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [websiteId, setWebsiteId] = useState(null);
    const [websites, setWebsites] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName("");
        setUrl("");
        setDescription("");
    };
    
    const handleShow = () => setShow(true); 

    useEffect(() => {
        refreshWebsites();
    }, []);

    const refreshWebsites = () => {
        API.get("websites/")
            .then((res) => {
                setWebsites(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { name, url, description };
        API.post("websites/", item).then(() => refreshWebsites());
        setName("");
        setUrl("");
        setDescription("");
    };

    const onUpdate = (id) => {
        let item = { name, url, description };
        API.put(`websites/${id}/`, item).then((res) => refreshWebsites());
        setName("");
        setUrl("");
        setDescription("");
    };

    const onDelete = (id) => {
        API.delete(`websites/${id}/`).then((res) => refreshWebsites());
    };

    function selectWebsite(id) {
        let item = websites.filter((website) => website.id === id)[0];
        setName(item.name);
        setUrl(item.url);
        setDescription(item.description);
        setWebsiteId(item.id);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update Website
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Website</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>{websiteId} Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Website Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicUrl">
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter URL"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
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
                                        onClick={() => onUpdate(websiteId)}
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
                                <th scope="col">Name</th>
                                <th scope="col">URL</th>
                                <th scope="col">Description</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {websites.map((website, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{website.id}</th>
                                        <td>{website.name}</td>
                                        <td><a class="item-nav-link" href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a></td>
                                        <td>{website.description}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectWebsite(website.id)}
                                                className="d-inline mt-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(website.id)}
                                                className="d-inline mt-2"
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

export default AddWebsite; 