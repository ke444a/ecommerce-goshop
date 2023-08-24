import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../app/firebase";
import { User, signInWithEmailAndPassword, UserCredential, signInWithCustomToken, signInWithPopup } from "firebase/auth";
import { useRegisterMutation } from "../features/auth";

interface Props {
    children: ReactNode;
}

interface IAuthContext {
  currentUser: User | null;
  isAdmin: boolean | undefined;
  token: string;
  signIn: (email: string, password: string) => Promise<UserCredential> | null;
  signInWithToken: (token: string) => Promise<UserCredential> | null;
  signInWithGoogle: () => Promise<UserCredential> | null;
  signUp: (data: IRegisterCredentials) => Promise<UserCredential> | null;
  signOut: () => void;
}


const AuthContext = createContext<IAuthContext>({
    currentUser: null,
    token: "",
    isAdmin: undefined,
    signIn: () => null,
    signInWithToken: () => null,
    signInWithGoogle: () => null,
    signUp: () => null,
    signOut: () => undefined
});


export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children } : Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>();
    
    const { mutateAsync: register } = useRegisterMutation();

    const handleCurrentUser = async (user: User | null) => {
        if (user) {
            setCurrentUser(user);
            const decoded = await user.getIdTokenResult();
            setToken(decoded.token);
            setIsAdmin(decoded.claims.role === "ADMIN");
        } else {
            setCurrentUser(null);
            setToken("");
        }
        setIsLoading(false);
    };

    const signIn = async (email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithToken = async (token: string) => {
        return await signInWithCustomToken(auth, token);
    };

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    const signUp = async (data: IRegisterCredentials) => {
        const { token } = await register(data);
        return await signInWithToken(token);
    };

    const signOut = () => {
        auth.signOut();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(handleCurrentUser);
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        isAdmin,
        token,
        signIn,
        signInWithToken,
        signInWithGoogle,
        signUp,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            { !isLoading && children }
        </AuthContext.Provider>
    );
};