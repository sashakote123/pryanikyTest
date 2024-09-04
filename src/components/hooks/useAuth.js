import { useContext } from "react";
import { AuthContext } from "../hoc/AuthContext";

export function useAuth(){
    return useContext(AuthContext)
}