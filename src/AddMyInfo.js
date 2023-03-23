import { useState, useEffect } from "react"; 
import { Button, Form, Modal } from 'react-bootstrap'; 
import API from "./API"; 

// first_name, last_name, email, street, city, state, postal, country 

const AddMyInfo = ({ onAdd }) => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const [myInfoId, setMyInfoId] = useState(null);
    const [myInfo, setMyInfo] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setStreet("");
        setCity("");
        setState("");
        setPostal("");
        setCountry("");
    };
    
    const handleShow = () => setShow(true); 

    useEffect(() => {
        refreshMyInfo();
    }, []);

    const refreshMyInfo = () => {
        API.get("myinfo/")
            .then((res) => {
                setMyInfo(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { first_name, last_name, email, street, city, state, postal, country };
        API.post("myinfo/", item).then(() => refreshMyInfo());
        setFirstName("");
        setLastName("");
        setEmail("");
        setStreet("");
        setCity("");
        setState("");
        setPostal("");
        setCountry("");
    };

    const onUpdate = (id) => {
        let item = { first_name, last_name, email, street, city, state, postal, country };
        API.put(`myinfo/${id}/`, item).then((res) => refreshMyInfo());
        setFirstName("");
        setLastName("");
        setEmail("");
        setStreet("");
        setCity("");
        setState("");
        setPostal("");
        setCountry("");
    };

    const onDelete = (id) => {
        API.delete(`myinfo/${id}/`).then((res) => refreshMyInfo());
    };

    function selectMyInfo(id) {
        let item = myInfo.filter((info) => info.id === id)[0];
        setFirstName(item.first_name);
        setLastName(item.last_name);
        setEmail(item.email);
        setStreet(item.street);
        setCity(item.city);
        setState(item.state);
        setPostal(item.postal);
        setCountry(item.country); 
        setMyInfoId(item.id); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Create/Update My Info
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>My Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicFirst">
                                    <Form.Label>{myInfoId} First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicStreetAdd">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Street Address"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicStateAdd">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPostal">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Postal Code"
                                        value={postal}
                                        onChange={(e) => setPostal(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
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
                                        onClick={() => onUpdate(myInfoId)}
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
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Street Address</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Postal Code</th>
                                <th scope="col">Country</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {myInfo.map((info, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{info.id}</th>
                                        <td>{info.first_name}</td>
                                        <td>{info.last_name}</td>
                                        <td>{info.email}</td>
                                        <td>{info.street}</td>
                                        <td>{info.city}</td>
                                        <td>{info.state}</td>
                                        <td>{info.postal}</td>
                                        <td>{info.country}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectMyInfo(info.id)}
                                                className="d-inline mb-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(info.id)}
                                                className="d-inline mx-2"
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

export default AddMyInfo; 