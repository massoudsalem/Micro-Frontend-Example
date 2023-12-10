import React, { useEffect } from "react";
import {mount} from "AngularClient/leftSideBar";

const LeftSidebarModule = () => {
  useEffect(() => {
    mount();  
  }, []);   
  return <app-root/>;
};

export default LeftSidebarModule;