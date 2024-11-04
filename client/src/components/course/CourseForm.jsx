import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCourse } from "../../context/CourseContext"; // Contexto para manejar capítulos

function CourseForm({ onClose, course }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createCourse, updateCourse } = useCourse();
    const statusOptions = ["Aprobado", "Rechazado", "Iniciado", "Finalizado","Pendiente"]; // Lista predefinida de estados

    // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:MM
    };

    useEffect(() => {
        if (course) {
            setValue("course_name", course.course_name);
            setValue("registration_date", formatDateForInput(course.registration_date));
            setValue("enrollment_date", formatDateForInput(course.enrollment_date));
            setValue("start_date", formatDateForInput(course.start_date));
            setValue("end_date", formatDateForInput(course.end_date));
            setValue("status", course.status); // Set initial value for status if available
        }
    }, [course, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (course) {
            updateCourse({ ...data, id: course.course_id });
        } else {
            createCourse(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Curso</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre Curso"
                    {...register("course_name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha de Registro"
                    {...register("registration_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha Matrículas"
                    {...register("enrollment_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha Inicio Curso"
                    {...register("start_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha Fin Curso"
                    {...register("end_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <select
                    {...register("status", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                >
                    <option value="">Seleccionar Estado</option>
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
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

export default CourseForm;
