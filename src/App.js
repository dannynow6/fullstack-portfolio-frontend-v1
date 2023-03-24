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
import Footer from './components/Footer';
import Profile from './components/Profile';
import TopPage from './components/TopPage';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Project from './components/Project';

function App() {
  return (
    <div className="App">
      <Header />
      <TopPage />
      <Profile />
      <Skills />
      <Education />
      <Experience />
      <Project />
      <AddProfile />
      <AddSkill /> 
      <AddEducation />
      <AddExperience /> 
      <AddProject />
      <AddWebsite />
      <AddHobby />
      <AddProfilePic />
      <AddMyInfo />
      <Footer />
    </div>
  );
}

export default App;
