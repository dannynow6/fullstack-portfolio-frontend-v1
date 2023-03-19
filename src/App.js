import './App.css';
import AddProfile from './AddProfile';
import AddSkill from './AddSkill';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';
import AddProject from './AddProject';
import AddWebsite from './AddWebsite';
import AddHobby from './AddHobby'; 

function App() {
  return (
    <div className="App">
      <AddProfile />
      <AddSkill /> 
      <AddEducation />
      <AddExperience /> 
      <AddProject />
      <AddWebsite />
      <AddHobby />
    </div>
  );
}

export default App;
