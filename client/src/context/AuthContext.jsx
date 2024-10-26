import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
// import Cookies from "js-cookie";
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be within an AuthProvider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    }
    // const signin = async (user) => {
    //     try {
    //         const res = await loginRequest(user);
    //         setIsAuthenticated(true);
    //         setUser(res.data);
    //     } catch (error) {
    //         console.log(error);
    //         setErrors(error.response.data.message);

    //     }
    // }
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticated(true);
            setUser(res.data);
            // Guardar el token en localStorage
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    };


    // const logout = async () => {
    //     try {
    //         const res = await logoutRequest();
    //         console.log(res);
    //         setIsAuthenticated(false);
    //         setUser(null);
    //     } catch (error) {
    //         console.log(error);
    //         setErrors(error.response.data.message);
    //     }
    // }

    const logout = async () => {
        try {
            const res = await logoutRequest();
            console.log(res);
            setIsAuthenticated(false);
            setUser(null);
            // Eliminar el token del localStorage
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    };


    

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    // useEffect(() => {
    //     async function checkLogin() {
    //         const cookies = Cookies.get();

    //         if (!cookies.token) {
    //             setIsAuthenticated(false);
    //             setLoading(false);
    //             return setUser(null);
    //         }

    //         try {
    //             const res = await verifyTokenRequest(cookies.token);
    //             if (!res.data) {
    //                 setIsAuthenticated(false);
    //                 setLoading(false);
    //                 return;
    //             }

    //             setIsAuthenticated(true);
    //             setUser(res.data);
    //             setLoading(false);

    //         } catch (error) {
    //             console.log(error);
    //             setIsAuthenticated(false);
    //             setUser(null);
    //             setLoading(false);

    //         }
    //     }
    //     checkLogin();
    // }, []);



    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )

}