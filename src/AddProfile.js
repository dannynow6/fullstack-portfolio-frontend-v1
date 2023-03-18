import { useState, useEffect } from "react"; 
import { ListGroup, Card, Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

const addProfile = ({ onAdd }) => {
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [profileId, setProfileId] = useState(null); 
    const [profiles, setProfiles] = useState([]); 

    useEffect(() => {
        refreshProfiles = () => {
            API.get("/")
                .then((res) => {
                    setProfiles(res.data); 
                    // setTitle(res[0].title);
                    // setDescription(res[0].description);
                    // setProfileId(res[0].id);
                })
                .catch(console.error);
        };

        const onSubmit = (e) => {
            e.preventDefault(); 
            let item = { title, description };
            API.post("/", item).then(() => refreshProfiles()); 
        };

        const onUpdate = (id) => {
            let item = { title }; 
            API.patch(`/${id}/`).then((res) => refreshProfiles()); 
        };

        const onDelete = (id) => {
            API.delete(`/${id}/`).then((res) => refreshProfiles());
        };

        function selectProfile(id) {
            let item = profiles.filter((profile) => profile.id === id)[0];
            setTitle(item.title);
            setDescription(item.description); 
            setProfileId(item.id); 
        }

        return (
            
        )
    })
}