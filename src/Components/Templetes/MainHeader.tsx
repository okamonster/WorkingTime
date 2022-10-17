import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export const MainHeader = () => {
    const navigate = useNavigate();
    const Logout = async() => {
        await signOut(auth);
        
    }
    const onClickWork = () => {
        navigate("/working");
        
    }

    const onClickLog = () => {
        navigate("/working/log");
    }


    return (
        <SHeader>
                <h1>WorkingTime</h1>
                <SHeaderContainer>
                    <Button variant="outlined" sx={{width:"80px"}} onClick={onClickWork}>打刻</Button>
                    <Button variant="outlined" sx={{width:"80px"}} onClick={onClickLog}>勤務履歴</Button>

                </SHeaderContainer>
        </SHeader>
            
    );
}


const SHeader = styled.header`
    display:flex;
    justify-content:space-between;
    
`;

const SHeaderContainer = styled.div`
    display:flex;
`;
