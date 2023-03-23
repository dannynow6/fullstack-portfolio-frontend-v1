import './App.css';
import AddProfile from './AddProfile';
import AddSkill from './AddSkill';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';
import AddProject from './AddProject';
import AddWebsite from './AddWebsite';
import AddHobby from './AddHobby'; 
import AddProfilePic from './AddProfilePic';
import AddMyInfo from './AddMyInfo';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <AddProfile />
      <AddSkill /> 
      <AddEducation />
      <AddExperience /> 
      <AddProject />
      <AddWebsite />
      <AddHobby />
      <AddProfilePic />
      <AddMyInfo />
    </div>
  );
}

export default App;
