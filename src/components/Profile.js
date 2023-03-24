// Display User Profile at top of page

import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 


const Profile = () => {
    const [profile, setProfile] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [profileId, setProfileId] = useState(null); 
    const [profiles, setProfiles] = useState([]); 
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTitle("");
        setDescription("");
    };

    const handleShow = () => setShow(true); 

    useEffect(() => {
        refreshProfiles();
    }, []); 

    const refreshProfiles = () => {
        API.get("profiles/")
            .then((res) => {
                setProfiles(res.data); 
                // setTitle(res[0].title);
                // setDescription(res[0].description);
                // setProfileId(res[0].id);
            })
            .catch(console.error);
    };

        const saveProfile = (e) => {
            e.preventDefault(); 
            let item = { title, description };
            API.post("profiles/", item).then(() => refreshProfiles()); 
            setTitle("");
            setDescription("");
        };

        const onUpdate = (id) => {
            let item = { title, description }; 
            API.put(`profiles/${id}/`, item).then((res) => refreshProfiles());
            setTitle("");
            setDescription(""); 
        };
    /*
        const onDelete = (id) => {
            API.delete(`profiles/${id}/`).then((res) => refreshProfiles());
        };

        function selectProfile(id) {
            let item = profiles.filter((profile) => profile.id === id)[0];
            setTitle(item.title);
            setDescription(item.description); 
            setProfileId(item.id); 
        }
    */

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
            <Row>
                <div className="col-md-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update Profile
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={saveProfile} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Label>{profileId} Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={6}
                                        placeholder="Enter Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="float-right">
                                    <Button 
                                        variant="outline-success"
                                        type="submit"
                                        onClick={saveProfile}
                                        className="mx-2"
                                    >Save</Button>
                                    <Button 
                                        variant="outline-primary"
                                        type="button"
                                        onClick={() => onUpdate(profileId)}
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
            </Row>
        </Container>
    )
};

export default Profile; 