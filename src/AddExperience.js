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
    const [current_employer, setCurrentEmployer] = useState(false);
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
    };

    const onUpdate = (id) => {
        let item = { position, employer_name, employer_city, employer_state, employer_country, start_date, end_date, current_employer, description };
        API.put(`experiences/${id}/`, item).then((res) => refreshExperiences());
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
                    <h3 className="float-left">Create New/Update Skill</h3>
                    <Form onSubmit={onSubmit} className="mt-4">
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
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Skill Level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Skill Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
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
                                onClick={() => onUpdate(skillId)}
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
                                <th scope="col">Skill Name</th>
                                <th scope="col">Skill Level</th>
                                <th scope="col">Skill Type</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{skill.id}</th>
                                        <td>{skill.name}</td>
                                        <td>{skill.level}</td>
                                        <td>{skill.type}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                type="button"
                                                onClick={() => selectSkill(skill.id)}
                                                className="d-inline mb-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                type="button"
                                                onClick={() => onDelete(skill.id)}
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