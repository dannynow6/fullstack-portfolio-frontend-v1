import { useState, useEffect } from "react"; 
import { Button, Form } from 'react-bootstrap'; 
import API from "./API"; 

const AddProfile = ({ onAdd }) => {
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [profileId, setProfileId] = useState(null); 
    const [profiles, setProfiles] = useState([]); 

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

        const onDelete = (id) => {
            API.delete(`profiles/${id}/`).then((res) => refreshProfiles());
        };

        function selectProfile(id) {
            let item = profiles.filter((profile) => profile.id === id)[0];
            setTitle(item.title);
            setDescription(item.description); 
            setProfileId(item.id); 
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="float-left border-bottom border-muted text-secondary">Create/Update Profile</h6>
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
                    </div>
                    <div className="col-md-8 m">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Profile Title</th>
                                    <th scope="col">Profile Description</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map((profile, index) => {
                                    return (
                                        <tr key="">
                                            <th scope="row">{profile.id}</th>
                                            <td>{profile.title}</td>
                                            <td>{profile.description}</td>
                                            <td>
                                                <Button 
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    type="button"
                                                    onClick={() => selectProfile(profile.id)}
                                                    className="d-inline mt-2"
                                                >
                                                    Select
                                                </Button>
                                                <Button 
                                                    variant="outline-danger"
                                                    size="sm"
                                                    type="button"
                                                    onClick={() => onDelete(profile.id)}
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


export default AddProfile; 