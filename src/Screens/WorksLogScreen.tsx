import styled from "@emotion/styled";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { collection, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { MainHeader } from "../Components/Templetes/MainHeader";
import { AuthContext } from "../Context/User";
import { db } from "../firebase";

export const WorksLog = () => {
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        if(currentUser != undefined){
            const q = query(collection(db,currentUser?.uid),orderBy("starttime","asc"));

    
        }
    
    })



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