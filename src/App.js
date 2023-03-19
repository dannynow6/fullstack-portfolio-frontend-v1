import './App.css';
import AddProfile from './AddProfile';
import AddSkill from './AddSkill';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';

function App() {
  return (
    <div className="App">
      <AddProfile />
      <AddSkill /> 
      <AddEducation />
      <AddExperience /> 
    </div>
  );
}

export default App;
