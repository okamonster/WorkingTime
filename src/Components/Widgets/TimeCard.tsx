import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

export const TimeCard = (props:any) => {
    const currentUser = props;
    const navigate = useNavigate();
    const [nowWorking,setNowWorking] = useState<boolean>(false);
    const [today,setToday] = useState( new Date());
    const [dayOfWeek,setDayofWeek] = useState( today.getDay());
    const [currentDocId,setcurrentDocId] = useState(""); 
    setInterval( () => {
        setToday(new Date());
        setDayofWeek(today.getDay());
    },1000);
    const dayOfWeekStr = ["日","月","火","水","木","金","土"];

    
    const WorkStart = async() => {
        setNowWorking(true);
        
        try{
               
            if(currentUser != undefined) {
                const docRef = await addDoc(collection(db,currentUser?.uid),{
                    type:"勤務中",
                    nowWorking:true,
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
                    nowWorking:false,         
                    endtime:serverTimestamp(),
                    salary:"0"
        
                });
            }else{
                navigate("/");
            }

        }catch(err) {
            console.log(err);
        }
    }

    return (
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
    );
}

const STimeCard = styled.div`
    border:solid 1px #808080;
    text-align:center;
    padding:20px;
`;