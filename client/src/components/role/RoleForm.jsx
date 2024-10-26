import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRole } from "../../context/RoleContext";

function RoleForm({ onClose, role }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createRole, updateRole } = useRole();

    useEffect(() => {
        if (role) {
            setValue("name", role.name);
            setValue("description", role.description);
        }
    }, [role, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (role) {
            updateRole({ ...data, id: role.role_id });
        } else {
            createRole(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Role</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Rol"
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

export default RoleForm;
