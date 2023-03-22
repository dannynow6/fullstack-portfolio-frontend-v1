import { useState, useEffect } from "react"; 
import { Button, Form, Modal } from 'react-bootstrap'; 
import API from "./API"; 

const AddProfilePic = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(null);
    const [profilePicId, setProfilePicId] = useState(null);
    const [profilePics, setProfilePics] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName("");
        setPicture(null);
    };

    const handleFileChange = (e) => {
        setPicture(e.target.files[0]); 
    };

    const handleShow = () => setShow(true); 
    
    useEffect(() => {
        refreshProfilePics();
    }, []);

    const refreshProfilePics = () => {
        API.get("profilepics/")
            .then((res) => {
                setProfilePics(res.data);
            })
            .catch(console.error);
    };
 
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target; 
        const formData = new FormData(form);
        API.post("profilepics/", formData).then(() => refreshProfilePics()); 
        setName("");
        setPicture(null);
    };

    const onUpdate = (id) => {
        let item = { name, picture };
        API.put(`profilepics/${id}/`, item).then((res) => refreshProfilePics());
        setName("");
        setPicture(null);
    };

    const onDelete = (id) => {
        API.delete(`profilepics/${id}/`).then((res) => refreshProfilePics());
    }; 

    function selectProfilePic(id) {
        let item = profilePics.filter((profilePic) => profilePic.id === id)[0];
        setName(item.name);
        setPicture(item.picture);
        setProfilePicId(item.id); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update ProfilePic
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>ProfilePic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form enctype="multipart/form-data" id="form" method="POST" action="http://127.0.0.1:8000/backend_api/profilepics/" onSubmit={onSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <label>{profilePicId} Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter Picture Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPicture">
                                    <Form.Label>Choose a Picture</Form.Label>
                                    <input 
                                        name="picture"
                                        class="form-control"
                                        type="file" 
                                        onChange={handleFileChange}
                                    ></input>
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
                                        onClick={() => onUpdate(profilePicId)}
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
                <div className="col-md-8 m">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Picture Name</th>
                                <th scope="col">Picture</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {profilePics.map((profilePic, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{profilePic.id}</th>
                                        <td>{profilePic.name}</td>
                                        <td><img src={profilePic.picture} alt={profilePic.name} class="profile-picture" /></td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectProfilePic(profilePic.id)}
                                                className="d-inline m-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(profilePic.id)}
                                                className="d-inline m-2"
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

export default AddProfilePic; 