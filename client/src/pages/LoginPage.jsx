import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);


    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold text-center ">Inicio de Sesión</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="email"
                    />
                    {
                        errors.email && <p className="text-red-500">Email requerido</p>
                    }
                    <input type="password" {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="contraseña"
                    />
                    {
                        errors.password && <p className="text-red-500">Contraseña requerida</p>
                    }

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
                {
                    // Solo mostrar el error si RegisterErrors no está vacío
                    signinErrors && (
                        <div className="bg-red-500 p-2 text-white">
                            {signinErrors}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoginPage