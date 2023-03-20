import { useState, useEffect } from "react"; 
import { Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

// name, start_date, end_date, description (use textarea), url (full url if applicable), additional_info 

const AddHobby = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [additional_info, setAdditionalInfo] = useState("");
    const [hobbyId, setHobbyId] = useState(null);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        refreshHobbies();
    }, []);

    const refreshHobbies = () => {
        API.get("hobbies/")
            .then((res) => {
                setHobbies(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { name, start_date, end_date, description, url, additional_info };
        API.post("hobbies/", item).then(() => refreshHobbies()); 
        setName("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setUrl("");
        setAdditionalInfo(""); 
    };

    const onUpdate = (id) => {
        let item = { name, start_date, end_date, description, url, additional_info };
        API.put(`hobbies/${id}/`, item).then((res) => refreshHobbies());
        setName("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setUrl("");
        setAdditionalInfo(""); 
    };

    const onDelete = (id) => {
        API.delete(`hobbies/${id}/`).then((res) => refreshHobbies()); 
    };

    function selectHobby(id) {
        let item = hobbies.filter((hobby) => hobby.id === id)[0];
        setName(item.name);
        setStartDate(item.start_date);
        setEndDate(item.end_date);
        setDescription(item.description);
        setUrl(item.url);
        setAdditionalInfo(item.additional_info);
        setHobbyId(item.id); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h6 className="float-left border-bottom border-muted text-secondary">Create/Update Hobby</h6>
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>{hobbyId} Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Hobby Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Start Date"
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter End Date"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicInfo">
                            <Form.Label>Additional Info</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Additional Info"
                                value={additional_info}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
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
                                onClick={() => onUpdate(hobbyId)}
                                className="mx-2"
                            >Update</Button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-8 m">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Description</th>
                                <th scope="col">URL</th>
                                <th scope="col">Additional Info</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hobbies.map((hobby, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{hobby.id}</th>
                                        <td>{hobby.name}</td>
                                        <td>{hobby.start_date}</td>
                                        <td>{hobby.end_date}</td>
                                        <td>{hobby.description}</td>
                                        <td>{hobby.url}</td>
                                        <td>{hobby.additional_info}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectHobby(hobby.id)}
                                                className="d-inline mt-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(hobby.id)}
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

export default AddHobby; 