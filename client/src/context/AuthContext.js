import { createContext, useState } from "react"
import { db, signInWithGoogle, signOutFromGoogle } from "../Firebase";
import { toast } from 'react-toastify';
import { addDoc, setDoc, doc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isSignedIn, setIsSignedIn] = useState((localStorage.getItem("isSignedIn")==="false" || localStorage.getItem("isSignedIn")===null)? false : true);
    
    const handleSignInContext = async () => {
        await signInWithGoogle()
        .then((result) => {
            const googleDisplayName = result.user.displayName;
            const googleProfilePic = result.user.photoURL;
            localStorage.setItem("googleDisplayName", googleDisplayName);
            localStorage.setItem("googleProfilePic", googleProfilePic);
            localStorage.setItem("isSignedIn", true);
            localStorage.setItem("userEmail", result.user.email);
            localStorage.setItem("userID", result.user.uid);


            setIsSignedIn((prev) => !prev);
            toast.success("Sign In successful.")
        })
        .catch((error) => {
            if(error.message === "Firebase: Error (auth/popup-closed-by-user)."){
                toast.error("Sign In was terminated. Please try again.")
            }
            else {
               console.log(error); 
            }
        });
    }
    const handleSignOutContext = async () => {
        await signOutFromGoogle()
            .then(() => {
            localStorage.removeItem("googleDisplayName");
            localStorage.removeItem("googleProfilePic");
            localStorage.setItem("isSignedIn", false);
            setIsSignedIn(false);
            localStorage.removeItem("userEmail")
            localStorage.removeItem("userID")
            toast("Sign Out successful.")
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return(
        <AuthContext.Provider value={{setIsSignedIn, isSignedIn, handleSignInContext, handleSignOutContext}}>
            {children}
        </AuthContext.Provider>        
    )
}
