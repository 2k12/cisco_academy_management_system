import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useModality } from "../../context/ModalityContext";

function ModalityForm({ onClose, modality }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createModality, updateModality } = useModality();

    useEffect(() => {
        if (modality) {
            setValue("name", modality.name);
            setValue("description", modality.description);
        }
    }, [modality, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (modality) {
            updateModality({ ...data, id: modality.modality_id });
        } else {
            createModality(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Modalidad</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de la Modalidad"
                    {...register("name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <textarea
                    rows={3}
                    placeholder="Descripción"
                    {...register("description")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                ></textarea>
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

export default ModalityForm;
