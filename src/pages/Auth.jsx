import { useContext } from "react";
import { useState } from "react";

{/* this is for form validation */}
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    //MARK: - PROPERTIES
    let [mode, setMode] = useState("signup");
    let [error, setError] = useState(null);

    {/* this gives us access to the authContext file and all its functions  */}
    let { signUp, user, logout, login } = useContext(AuthContext);

{/* when users successfully logg in or register we use this to naviagte them to the main screen/homepage  */}
    let navigate = useNavigate();

{/* lets us handle the auth proccess and its errors etc  */}
    let { register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(data) {
        setError(null);
        let result;

        if (mode === "signup") {
          result = signUp(data.email, data.password)
        } else {
          result = login(data.email, data.password)
        }

        if (result.success) {
            navigate("/")
        } else {
            setError(result.error);
            alert(result.error);
        }

        console.log(result);
    }

    //MARK: - BODY
    return <div className="page">
        <div className="container">
            <div className="auth-container">
            {user && <p>User logged in: {user.email}</p>}

            <button onClick={() => logout()}>logout</button>

                {/* headline title/text  */}
                <h1 className="page-title">
                   {mode === "signup" ? "Sign Up" : "Login"} 
                </h1>

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                {/* email label and textfield  */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                         className="form-input" 
                         type="email" id="email" 
                         {...register("email", {required: "Email is required"})}
                         />

                         {errors.email && (
                         <span className="form-error">{errors.email.message}</span>
                        )}

                    </div>

                {/* password label and textfield  */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                        {...register("password", {
                        required: "password is required", 
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                        maxLength: {
                            value: 12,
                            message: "Password must be less than 12 characters"
                        },

                    })}
                         className="form-input" 
                         type="password" id="password" 
                          />

                        {errors.password && 
                        <span className="form-error">{errors.password.message}</span>
                        }
                    </div>

                {/* sign in button with styling  */}
                    <button type="submit" className="btn btn-primary">
                    {mode === "signup" ? "Sign Up" : "Login"}
                    </button>
                </form>

                {/* ternary statement using the state created above to switch between login and registration */}
                <div className="auth-switch">
                    {mode === "signup" ? (
                        <p>
                        Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span>
                       </p>

                    ) : (
                        <p>
                        Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span>
                       </p>
                    )}
                    
                </div>
            </div>
        </div>
    </div>;
}