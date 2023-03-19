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
    };

    const onUpdate = (id) => {
        let item = { school_name, school_city, school_state, school_country, degree_earned, program, date_started, date_completed, accolades };
        API.put(`education/${id}/`, item).then((res) => refreshEducation()); 
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
        
    )
}