import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../Context/User";

export const LogInScreen = () => {
    const navigate = useNavigate();

    const onClickSignUp = () => navigate("/signup");
    

    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");
    

    const handleLogin = async(e:any) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(
                auth,
                emailInput,
                passwordInput,
            );
            navigate("/working");
        }catch(err){
            console.log("")
        }
    }

    const {currentUser} = useContext(AuthContext);
    
    

    return(
        currentUser ? <Navigate to = {"/working"}/>:
        <SLoginPage>
            <h1>WorkingTime</h1>
           
                <TextField label = "メールアドレス" variant = "standard" sx={{
                    marginBottom:"1rem",
                }} value = {emailInput} onChange = {(e) => setEmailInput(e.target.value)}
                />
                <TextField label = "パスワード" variant = "standard" sx={{
                    marginBottom:"1.5rem",
                }} value = {passwordInput} onChange = {(e) => setPasswordInput(e.target.value)}
                />
                <Button variant = "contained" onClick = {handleLogin}>ログイン</Button>
          
            <p onClick={onClickSignUp}>サインアップ</p>
        </SLoginPage>
        
    );
}


const SLoginPage = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
    margin:0 auto;
`;
