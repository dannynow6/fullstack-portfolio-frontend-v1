import { Container } from 'react-bootstrap'; 
import API from '../API';
import { useState, useEffect } from 'react'; 

const TopPage = () => {
    const [pic, setPic] = useState("");

    useEffect(() => {
        getPicture();
    }, []);

    const getPicture = () => {
        API.get("profilepics/1")
            .then((res) => {
                setPic(res.data);
            })
            .catch(console.error);
    };

    return (
        <Container className="mt-4">
            <div id="top-page">
                <div className='row'>
                    <div className="col col-md-4">
                        <img src={pic.picture} alt="top-portfolio" id="top-picture" className="shadow-lg rounded-circle" />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        <h4 className="display-4">
                            Portfolio
                        </h4>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default TopPage; 