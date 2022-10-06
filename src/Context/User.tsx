import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type AuthContextProps = {
    currentUser: User|null|undefined;
    signInCheck: boolean,
};

const AuthContext = createContext<AuthContextProps>({
    currentUser:undefined,
    signInCheck:false,
});

const AuthProvider = (props:any) => {
    const [currentUser,setCurrentUser] = useState<User|null|undefined>(undefined);
    const [signInCheck,setSignInCheck] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (user:any) => {
            if(user) {
                setCurrentUser(user);
                setSignInCheck(true);
            }else{
                setSignInCheck(true);
            }
        });
    },[]);

    if(signInCheck){
        return(
            <AuthContext.Provider value={{currentUser,signInCheck}}>
                {props.children}                
            </AuthContext.Provider>
        );
    }else{
        return(
            <div>
                <CircularProgress/>
            </div>
        );
    }

}
export {AuthContext,AuthProvider};
