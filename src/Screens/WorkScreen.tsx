import styled from "@emotion/styled";
import React,{ useContext } from "react";
import { MainHeader } from "../Components/Templetes/MainHeader";
import { TimeCard } from "../Components/Widgets/TimeCard";
import { AuthContext } from "../Context/User";



export const WorkScreen = () => {
  
    const {currentUser} = useContext(AuthContext);
    

    return(
        <SWorkScreen>
            <MainHeader/>
            <TimeCard {...currentUser} /> 
        </SWorkScreen>
    );
}

const SWorkScreen = styled.div`
    width:80%;
    margin:0 auto;
`;
