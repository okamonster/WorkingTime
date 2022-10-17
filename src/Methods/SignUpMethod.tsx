import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const SignUpMethod = async(props:any) => {
        const [emailInput,passwordInput,userName] = props;
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