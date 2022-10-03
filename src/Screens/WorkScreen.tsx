import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
//import { signOut } from "firebase/auth";
import React,{ useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/User";
import { auth, db } from "../firebase";


export const WorkScreen = () => {
    const [today,setToday] = useState( new Date());
    const [dayOfWeek,setDayofWeek] = useState( today.getDay());
    const navigate = useNavigate();
    
    const [currentDocId,setcurrentDocId] = useState(""); 
    setInterval( () => {
        setToday(new Date());
        setDayofWeek(today.getDay());
    },1000);

    const dayOfWeekStr = ["日","月","火","水","木","金","土"];
    const [nowWorking,setNowWorking] = useState(false);
    
    const onClickLogout = async() => {
        await signOut(auth);
        <Navigate to = {"/"}/>

        console.log(currentUser)
        
    };
        
    
    const WorkStart = async() => {
        setNowWorking(true);
        
        try{
               
            if(currentUser != undefined) {
                const docRef = await addDoc(collection(db,currentUser?.uid),{
                    type:"勤務中",
                    
                    starttime:serverTimestamp(),        
                });
                setcurrentDocId(docRef.id)
            }else{
                navigate("/");
            }
            
            
        }catch(err) {
            console.log(err);
        }
        console.log(nowWorking)
    }

    const WorkEnd = async() => {
        setNowWorking(false);
        
        try{
            if(currentUser != undefined){
                await updateDoc(doc(db,currentUser?.uid,currentDocId),{
                    type:"勤務終了",
                    
                    endtime:serverTimestamp(),
                });
            }else{
                navigate("/");
            }
            
        }catch(err) {
            console.log(err);
        }
    }


    const {currentUser} = useContext(AuthContext);
    
    useEffect(() => {

    })


    return(
        <SWorkScreen>
            <SHeader>
                <h1>WorkingTime</h1>
                <SHeaderContainer>
                    <Button variant="outlined" sx={{width:"80px"}}>打刻</Button>
                    <Button variant="outlined" sx={{width:"80px"}}>勤務履歴</Button>
                    <Button variant="outlined" sx={{width:"80px"}}>変更届</Button>
                    <Button variant="outlined" sx={{width:"80px"}} onClick={onClickLogout}>ログアウト</Button>
                </SHeaderContainer>
            </SHeader>
            
            <STimeCard>
                <p>{currentUser?.displayName}</p>
                <p>{`${today.getMonth()+1}月${today.getDate()}日 (${dayOfWeekStr[dayOfWeek]})`}</p>
                <h1>{`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`}</h1>
                <div>
                    <Button 
                    onClick={WorkStart}
                    variant={nowWorking ? "outlined" : "contained"} sx = {{
                        marginRight:"30px",
                    }} 
                    disabled = {nowWorking ? true : false}
                    >出勤</Button>
                    <Button 
                    onClick={WorkEnd}
                    variant={nowWorking ? "contained" : "outlined"}
                    disabled = {nowWorking ? false : true}
                    >退勤</Button>
                    
                </div>
            </STimeCard>
        </SWorkScreen>
    );
}

const SHeader = styled.header`
    display:flex;
    justify-content:space-between;
    
`;

const SHeaderContainer = styled.div`
    display:flex;
`;

const SWorkScreen = styled.div`
    width:80%;
    margin:0 auto;
`;

const STimeCard = styled.div`
    border:solid 1px #808080;
    text-align:center;
    padding:20px;
`;