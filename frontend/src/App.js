import './App.css';
import Login from './Components/Login';
import MainContainer from './Components/MainContainer';
import { Route, Routes } from "react-router-dom";
import WelcomePage from './Components/WelcomePage';
import WorkArea from './Components/WorkArea';
import Users from './Components/Users';
import Groups from './Components/Groups';
import CreateGroups from './Components/CreateGroups';
import { useState } from 'react';
import Register from './Components/Register';

function App() {

  const [lightTheme,setLightTheme] = useState(true);

  return (
    <div className={"container" + (lightTheme?"":" darkest")}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='app' element={<MainContainer lightTheme={lightTheme} setLightTheme={setLightTheme}/>}>
          <Route path='welcome' element={<WelcomePage lightTheme={lightTheme}/>}/>
          <Route path='chat/:_id' element={<WorkArea  lightTheme={lightTheme}/>}/>
          <Route path='users' element={<Users lightTheme={lightTheme}/>}/>
          <Route path='groups' element={<Groups lightTheme={lightTheme}/>}/>
          <Route path='create-groups' element={<CreateGroups lightTheme={lightTheme}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
