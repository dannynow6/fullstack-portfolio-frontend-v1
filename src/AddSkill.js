import { useState, useEffect } from "react"; 
import { Button, Form, Dropdown } from 'react-bootstrap'; 
import API from "./API"; 

// id, name, level (advanced, familiar), type (hard/soft)

const AddSkill = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");
    const [skillId, setSkillId] = useState(null);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        refreshSkills();
    }, []);

    const refreshSkills = () => {
        API.get("skills/")
            .then((res) => {
                setSkills(res.data);
                // setName(res[0].name);
                // setLevel(res[0].level);
                // setType(res[0].type);
                // setSkillId(res[0].id);
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <Dropdown className="float-left">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdownSkill">Create/Update Skill</Dropdown.Toggle>

                        <Dropdown.Menu>
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
                        </Dropdown.Menu>
                    </Dropdown>

                    
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
                                                size="sm"
                                                type="button"
                                                onClick={() => selectSkill(skill.id)}
                                                className="d-inline mb-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
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

export default AddSkill; 