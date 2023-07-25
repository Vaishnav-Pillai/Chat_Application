import React, { createContext, useState } from 'react';
import "./styles.css";
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export const myContext = createContext();

function MainContainer(props) {
    const [refresh, setRefresh] = useState(true);

  return (
    <div className={"main-container" + (props.lightTheme?"":" darker")}>
        <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
            <Sidebar  lightTheme={props.lightTheme} setLightTheme={props.setLightTheme}/>
            <Outlet/>
        </myContext.Provider>
        {/* <WelcomePage/> */}
        {/* <CreateGroups/> */}
        {/* <WorkArea props={conversations[0]}/> */}
        {/* <User_Groups/> */}
    </div>
  )
}

export default MainContainer
