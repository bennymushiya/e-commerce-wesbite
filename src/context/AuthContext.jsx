import { useState } from "react";
import { useContext, createContext } from "react";

 export let AuthContext = createContext(null);

export default function AuthProvider({children}) {

{/* when the currentUser loggs in we ssave a property currentUserEmail, when they come back if that propety exists and is the same then we logg them back in if not we show the sign up page */}
    let [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? {email: localStorage.getItem("currentUserEmail")} : null);

    function signUp(email, password) {
        {/* we fetch the current array of users that exists in local storage*/}
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists"};
        }
        
        {/* this is how you write an object, that contains properties of an email and password*/}
        let newUser = {email, password}

     {/* we add the new user into the array*/}
        users.push(newUser);

    {/* this is how we add the signed in user into the local data base*/}
        localStorage.setItem("users", JSON.stringify(users));

        {/* when the user opens the website, if there is an object with this email, we know the user was logged in and logged into this account */}
        localStorage.setItem("currentUserEmail", email);

        setUser({ email })
        return { success: true };
    }

    function login(email, password) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        let user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: "Invalid email or password"};
        }

        localStorage.setItem("currentUserEmail", email);
        setUser({ email })

        return { success: true };
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return <AuthContext.Provider value={{ signUp, user, logout, login }}>{children}</AuthContext.Provider>;
}


//MARK: - CUSTOM HOOK TO EASILY USE AUTH CONTEXT

// every hook has to start with the name use
export function useAuth() {
    let context = useContext(AuthContext);

    return context;
}
