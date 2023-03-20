import { useState, useEffect } from "react"; 
import { Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

// position, employer_name, employer_city, employer_state, employer_country, start_date, end_date, current_employer (true/false), description (of job - use textarea) 

const AddExperience = ({ onAdd }) => {
    const [position, setPosition] = useState("");
    const [employer_name, setEmployerName] = useState("");
    const [employer_city, setEmployerCity] = useState("");
    const [employer_state, setEmployerState] = useState("");
    const [employer_country, setEmployerCountry] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [current_employer, setCurrentEmployer] = useState("");
    const [description, setDescription] = useState("");
    const [experienceId, setExperienceId] = useState(null);
    const [experiences, setExperiences] = useState([]); 

    useEffect(() => {
        refreshExperiences();
    }, []);

    const refreshExperiences = () => {
        API.get("experiences/")
            .then((res) => {
                setExperiences(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { position, employer_name, employer_city, employer_state, employer_country, start_date, end_date, current_employer, description };
        API.post("experiences/", item).then(() => refreshExperiences()); 
        setPosition("");
        setEmployerName("");
        setEmployerCity("");
        setEmployerState("");
        setEmployerCountry("");
        setStartDate("");
        setEndDate("");
        setCurrentEmployer("");
        setDescription(""); 
    };

    const onUpdate = (id) => {
        let item = { position, employer_name, employer_city, employer_state, employer_country, start_date, end_date, current_employer, description };
        API.put(`experiences/${id}/`, item).then((res) => refreshExperiences());
        setPosition("");
        setEmployerName("");
        setEmployerCity("");
        setEmployerState("");
        setEmployerCountry("");
        setStartDate("");
        setEndDate("");
        setCurrentEmployer("");
        setDescription(""); 
    };

    const onDelete = (id) => {
        API.delete(`experiences/${id}/`).then((res) => refreshExperiences());
    }; 

    function selectExperience(id) {
        let item = experiences.filter((experience) => experience.id === id)[0];
        setPosition(item.position);
        setEmployerName(item.employer_name);
        setEmployerCity(item.employer_city);
        setEmployerState(item.employer_state);
        setEmployerCountry(item.employer_country);
        setStartDate(item.start_date);
        setEndDate(item.end_date);
        setCurrentEmployer(item.current_employer);
        setDescription(item.description);
        setExperienceId(item.id); 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h6 className="float-left border-bottom border-muted text-secondary pb-2">Create/Update Experience</h6>
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicPosition">
                            <Form.Label>{experienceId} Position</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpName">
                            <Form.Label>Employer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employer Name"
                                value={employer_name}
                                onChange={(e) => setEmployerName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpCity">
                            <Form.Label>Employer City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employer City"
                                value={employer_city}
                                onChange={(e) => setEmployerCity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpState">
                            <Form.Label>Employer State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employer State"
                                value={employer_state}
                                onChange={(e) => setEmployerState(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpCountry">
                            <Form.Label>Employer Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employer Country"
                                value={employer_country}
                                onChange={(e) => setEmployerCountry(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={start_date}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={end_date}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmpCurrent">
                            <Form.Label>Current Employer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter 'yes' or 'no'"
                                value={current_employer}
                                onChange={(e) => setCurrentEmployer(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Job Description</Form.Label>
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
                                onClick={onSubmit}
                                className="mx-2"
                            >Save</Button>
                            <Button 
                                variant="outline-primary"
                                type="button"
                                onClick={() => onUpdate(experienceId)}
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
                                <th scope="col">Position</th>
                                <th scope="col">Employer Name</th>
                                <th scope="col">Employer City</th>
                                <th scope="col">Employer State</th>
                                <th scope="col">Employer Country</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Current Employer</th>
                                <th scope="col">Description</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.map((experience, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{experience.id}</th>
                                        <td>{experience.position}</td>
                                        <td>{experience.employer_name}</td>
                                        <td>{experience.employer_city}</td>
                                        <td>{experience.employer_state}</td>
                                        <td>{experience.employer_country}</td>
                                        <td>{experience.start_date}</td>
                                        <td>{experience.end_date}</td>
                                        <td>{experience.current_employer}</td>
                                        <td>{experience.description}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectExperience(experience.id)}
                                                className="d-inline mb-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(experience.id)}
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

export default AddExperience; 