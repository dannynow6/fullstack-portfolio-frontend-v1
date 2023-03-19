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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="float-left">Create New Profile</h3>
                        <Form onSubmit={onSubmit} className="mt-4">
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>{profileId}Title</Form.Label>
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
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <div className="float-right">
                                <Button 
                                    variant="primary"
                                    type="submit"
                                    onClick={onSubmit}
                                    className="mx-2"
                                >Save</Button>
                                <Button 
                                    variant="primary"
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
                                                <i 
                                                    className="fa fa-pencil-square text-primary d-inline"
                                                    aria-hidden="true"
                                                    onClick={() => selectProfile(profile.id)}
                                                ></i>
                                                <i 
                                                    className="fa fa-trash-o text-danger d-inline mx-3"
                                                    aria-hidden="true"
                                                    onClick={() => onDelete(profile.id)}
                                                ></i>
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