import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export const MainHeader = () => {

    
    const onClickLogout = async() => {
        await signOut(auth);
        <Navigate to = {"/"}/>
        
    };

    return (
        <SHeader>
                <h1>WorkingTime</h1>
                <SHeaderContainer>
                    <Button variant="outlined" sx={{width:"80px"}}>打刻</Button>
                    <Button variant="outlined" sx={{width:"80px"}}>勤務履歴</Button>
                    <Button variant="outlined" sx={{width:"80px"}}>変更届</Button>
                    <Button variant="outlined" sx={{width:"80px"}} onClick={onClickLogout}>ログアウト</Button>
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
