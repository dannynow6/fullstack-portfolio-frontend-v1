import { useState, useEffect } from "react"; 
import { Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

// school_name, school_city, school_state, school_country, degree_earned, program, date_started, date_completed, accolades 

const AddEducation = ({ onAdd }) => {
    const [school_name, setSchoolName] = useState(""); 
    const [school_city, setSchoolCity] = useState("");
    const [school_state, setSchoolState] = useState("");
    const [school_country, setSchoolCountry] = useState("");
    const [degree_earned, setDegreeEarned] = useState("");
    const [program, setProgram] = useState(""); 
    const [date_started, setDateStarted] = useState("");
    const [date_completed, setDateCompleted] = useState(""); 
    const [accolades, setAccolades] = useState("");
    const [educationId, setEducationId] = useState(null);
    const [educations, setEducations] = useState([]); 

    useEffect(() => {
        refreshEducation();
    }, []);

    const refreshEducation = () => {
        API.get("education/")
            .then((res) => {
                setEducations(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { school_name, school_city, school_state, school_country, degree_earned, program, date_started, date_completed, accolades };
        API.post("education/", item).then(() => refreshEducation()); 
        setSchoolName("");
        setSchoolCity("");
        setSchoolState("");
        setSchoolCountry("");
        setDegreeEarned("");
        setProgram("");
        setDateStarted("");
        setDateCompleted("");
        setAccolades("");
    };

    const onUpdate = (id) => {
        let item = { school_name, school_city, school_state, school_country, degree_earned, program, date_started, date_completed, accolades };
        API.put(`education/${id}/`, item).then((res) => refreshEducation()); 
        setSchoolName("");
        setSchoolCity("");
        setSchoolState("");
        setSchoolCountry("");
        setDegreeEarned("");
        setProgram("");
        setDateStarted("");
        setDateCompleted("");
        setAccolades("");
    };

    const onDelete = (id) => {
        API.delete(`education/${id}/`).then((res) => refreshEducation()); 
    };

    function selectEducation(id) {
        let item = educations.filter((education) => education.id === id)[0];
        setSchoolName(item.school_name);
        setSchoolCity(item.school_city);
        setSchoolState(item.school_state);
        setSchoolCountry(item.school_country);
        setDegreeEarned(item.degree_earned);
        setProgram(item.program);
        setDateStarted(item.date_started);
        setDateCompleted(item.date_completed);
        setAccolades(item.accolades);
        setEducationId(item.id);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h6 className="float-left border-bottom border-muted text-secondary pb-2">Create/Update Education</h6>
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicSchoolName">
                            <Form.Label>{educationId} School Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter School Name"
                                value={school_name}
                                onChange={(e) => setSchoolName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSchoolCity">
                            <Form.Label>School City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter School City"
                                value={school_city}
                                onChange={(e) => setSchoolCity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSchoolState">
                            <Form.Label>School State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter School State"
                                value={school_state}
                                onChange={(e) => setSchoolState(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSchoolCountry">
                            <Form.Label>School Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter School Country"
                                value={school_country}
                                onChange={(e) => setSchoolCountry(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDegree">
                            <Form.Label>Degree Earned</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Degree"
                                value={degree_earned}
                                onChange={(e) => setDegreeEarned(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProgram">
                            <Form.Label>Program</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Program"
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDateStarted">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={date_started}
                                onChange={(e) => setDateStarted(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDateCompleted">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                value={date_completed}
                                onChange={(e) => setDateCompleted(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSAccolades">
                            <Form.Label>Accolades</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Accolades/Achievements"
                                value={accolades}
                                onChange={(e) => setAccolades(e.target.value)}
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
                                onClick={() => onUpdate(educationId)}
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
                                <th scope="col">School Name</th>
                                <th scope="col">School City</th>
                                <th scope="col">School State</th>
                                <th scope="col">School Country</th>
                                <th scope="col">Degree</th>
                                <th scope="col">Program</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Accolades</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map((education, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{education.id}</th>
                                        <td>{education.school_name}</td>
                                        <td>{education.school_city}</td>
                                        <td>{education.school_state}</td>
                                        <td>{education.school_country}</td>
                                        <td>{education.degree_earned}</td>
                                        <td>{education.program}</td>
                                        <td>{education.date_started}</td>
                                        <td>{education.date_completed}</td>
                                        <td>{education.accolades}</td>
                                        <td>
                                            <Button 
                                                variant="outline-secondary"
                                                size="sm"
                                                type="button"
                                                onClick={() => selectEducation(education.id)}
                                                className="d-inline mb-2"
                                            >
                                                Select
                                            </Button>
                                            <Button 
                                                variant="outline-danger"
                                                size="sm"
                                                type="button"
                                                onClick={() => onDelete(education.id)}
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

export default AddEducation; 