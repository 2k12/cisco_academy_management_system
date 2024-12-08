import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useInfoUtn } from "../../context/InfoUtnContext"; // Contexto para manejar capítulos

function InfoUtnForm({ onClose, info_utn }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createInfoUtn, updateInfoUtn } = useInfoUtn();

    useEffect(() => {
        if (info_utn) {
            setValue("faculty", info_utn.faculty);
            setValue("degree", info_utn.degree);
            // Convertimos las fechas al formato adecuado para el input 'datetime-local'
            setValue("degree_level", info_utn.degree_level);
        }
    }, [info_utn, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (info_utn) {
            updateInfoUtn({ ...data, id: info_utn.info_utn_id });
        } else {
            createInfoUtn(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Información UTN</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre Facultad"
                    {...register("faculty", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Carrera"
                    {...register("degree", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="number"
                    placeholder="Nivel"
                    {...register("degree_level")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-colors"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default InfoUtnForm;
