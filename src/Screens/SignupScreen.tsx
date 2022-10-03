import React, { useContext, useEffect, useState } from "react";
import { TextField,Button,Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth,db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Context/User";


export const SignupScreen = () => {
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");

    const onClickLogin = () => {
        navigate("/");
    }

    const handleSignup =async (e:any) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(
                auth,
                emailInput,
                passwordInput,
                
            ).then((userCredential)=> {
                updateProfile(userCredential.user,{
                    displayName:userName,
                })                
            });

        }catch(err) {
            console.log(err);
        }
    }

    
    const {currentUser} = useContext(AuthContext);
    

    return(
        currentUser ? <Navigate to={"/"}/>
        :<SLoginPage>
            <h1>WorkingTime</h1>
                <TextField label = "ユーザーネーム" variant = "standard" value = {userName} sx={{
                    marginBottom:"1rem",
                }} onChange = {(e) => setUserName(e.target.value)}
                />
                <TextField label = "メールアドレス" variant = "standard" value = {emailInput} sx={{
                    marginBottom:"1rem",
                }} onChange = {(e) => setEmailInput(e.target.value)}
                />
                <TextField label = "パスワード" variant = "standard" value = {passwordInput} sx={{
                    marginBottom:"1.5rem",
                }} onChange = {(e) => setPasswordInput(e.target.value)}
                />
                
                <Button variant = "contained" onClick={handleSignup}>サインアップ</Button>
        
            <p onClick = {onClickLogin}>ログイン</p>
        </SLoginPage>
        
    );
}

const SLoginPage = styled.div`
    display:flex;
    flex-direction: column;
    width:80%;
    margin:0 auto;
`;
