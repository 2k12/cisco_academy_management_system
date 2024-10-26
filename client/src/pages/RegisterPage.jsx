import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, errors: RegisterErrors } = useAuth();
    // const navigate = useNavigate();
    // console.log(user);

    // useEffect(() => {
    //     if (isAuthenticated) navigate("/permissions");
    // }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                // Solo mostrar el error si RegisterErrors no está vacío
                RegisterErrors && (
                    <div className="bg-red-500 p-2 text-white">
                        {RegisterErrors}
                    </div>
                )
            }
            <form onSubmit={onSubmit}>
                {/* email, password, name, address, status  */}
                <input type="text" {...register("name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="nombre"
                />
                {
                    errors.name && <p className="text-red-500">Nombre requerido</p>
                }
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
                <input type="text" {...register("address", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="dirección"
                />
                {
                    errors.address && <p className="text-red-500">Dirección requerida</p>
                }
                <button type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-colors"
                >Registrar</button>
            </form>
        </div>
    )
}

export default RegisterPage