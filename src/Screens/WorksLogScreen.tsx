import styled from "@emotion/styled";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { collection, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { MainHeader } from "../Components/Templetes/MainHeader";
import { AuthContext } from "../Context/User";
import { db } from "../firebase";

export const WorksLog = () => {
    const {currentUser} = useContext(AuthContext);
    const [document,setDocument] = useState<any>();

    useEffect(() => {
        if(currentUser != undefined){
            
           const getDocument = async() => {
                const q = query(collection(db,currentUser?.uid),orderBy("starttime","asc"));
        
                await getDocs(q).then((snapshot) => {
                    
                    setDocument(snapshot.docs.map((doc) => ({...doc.data()})))
    
                })
           }
           
           getDocument();  
           

        }else{
            
            <Navigate to = {"/"}/>
        }
        
    },[])


    


    return(
        <SWorksLog>
            
            <MainHeader/>
             
            <SLog>
                <h2>勤務履歴</h2>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">勤務日</TableCell>
                            <TableCell align="left">始業時間</TableCell>
                            <TableCell align="left">終業時間</TableCell>
                            <TableCell align="left">給与</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    {
                        document ? document.map((doc:any) => (
                            
                            <TableRow>
                                <TableCell>
                                    {doc.starttime.toDate().getFullYear()}
                                    /{doc.starttime.toDate().getMonth()+1}
                                    /{doc.starttime.toDate().getDate()}
                                </TableCell>
                                <TableCell>
                                    {doc.starttime.toDate().getHours()}
                                    :{doc.starttime.toDate().getMinutes()}
                                </TableCell>
                                <TableCell>
                                    {doc.endtime ? doc.endtime.toDate().getHours():"00"}
                                    :{doc.endtime ? doc.endtime.toDate().getMinutes():"00"}
                                </TableCell>
                                <TableCell>
                                    {doc.salary ? doc.salary: ""}
                                </TableCell>
                            </TableRow>
                            
                        )) : <TableCell></TableCell>
                    
                    }            
                            
                                 
                    </TableBody>
                </Table>
            </SLog>
        </SWorksLog>
    );
}

const SWorksLog = styled.div`
    width:80%;
    margin:0 auto;
`;

const SLog = styled.div`

`;