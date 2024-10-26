import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParticipantType } from "../../context/ParticipantTypeContext";

function ParticipantTypeForm({ onClose, participant_type }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createParticipantType, updateParticipantType } = useParticipantType();

    useEffect(() => {
        if (participant_type) {
            setValue("name", participant_type.name);
            setValue("status", participant_type.status);
        }
    }, [participant_type, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (participant_type) {
            updateParticipantType({ ...data, id: participant_type.participant_type_id });
        } else {
            createParticipantType(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Tipo de Participante</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Tipo de Participante"
                    {...register("name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
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

export default ParticipantTypeForm;
