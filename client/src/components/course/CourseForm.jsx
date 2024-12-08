import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCourse } from "../../context/CourseContext"; // Contexto para manejar capítulos

function CourseForm({ onClose, course }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createCourse, updateCourse } = useCourse();
    const statusOptions = ["Aprobado", "Rechazado", "Iniciado", "Finalizado", "Pendiente"]; // Lista predefinida de estados

    // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Formato: YYYY-MM-DDTHH:MM
    };

    useEffect(() => {
        if (course) {
            setValue("course_name", course.course_name);
            setValue("start_date", formatDateForInput(course.start_date));
            setValue("end_date", formatDateForInput(course.end_date));
            setValue("status", course.status); // Set initial value for status if available
            setValue("start_registration_date", formatDateForInput(course.start_registration_date));
            setValue("end_registration_date", formatDateForInput(course.end_registration_date));
            setValue("start_enrollment_date", formatDateForInput(course.start_enrollment_date));
            setValue("end_enrollment_date", formatDateForInput(course.end_enrollment_date));
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
                {/* Nombre del Curso */}
                <label htmlFor="course_name" className="text-white block my-2">
                    Nombre del Curso:
                </label>
                <input
                    id="course_name"
                    type="text"
                    placeholder="Nombre Curso"
                    {...register("course_name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />

                {/* Fecha Inicio de Registro */}
                <label htmlFor="start_registration_date" className="text-white block my-2">
                    Fecha Inicio de Registro:
                </label>
                <input
                    id="start_registration_date"
                    type="datetime-local"
                    {...register("start_registration_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {/* Fecha Fin de Registro */}
                <label htmlFor="end_registration_date" className="text-white block my-2">
                    Fecha Fin de Registro:
                </label>
                <input
                    id="end_registration_date"
                    type="datetime-local"
                    {...register("end_registration_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {/* Fecha Inicio de Matrículas */}
                <label htmlFor="start_enrollment_date" className="text-white block my-2">
                    Fecha Inicio de Matrículas:
                </label>
                <input
                    id="start_enrollment_date"
                    type="datetime-local"
                    {...register("start_enrollment_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {/* Fecha Fin de Matrículas */}
                <label htmlFor="end_enrollment_date" className="text-white block my-2">
                    Fecha Fin de Matrículas:
                </label>
                <input
                    id="end_enrollment_date"
                    type="datetime-local"
                    {...register("end_enrollment_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />

                {/* Fecha de Inicio del Curso */}
                <label htmlFor="start_date" className="text-white block my-2">
                    Fecha de Inicio del Curso:
                </label>
                <input
                    id="start_date"
                    type="datetime-local"
                    {...register("start_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />

                {/* Fecha de Fin del Curso */}
                <label htmlFor="end_date" className="text-white block my-2">
                    Fecha de Fin del Curso:
                </label>
                <input
                    id="end_date"
                    type="datetime-local"
                    {...register("end_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />

                {/* Estado */}
                <label htmlFor="status" className="text-white block my-2">
                    Estado:
                </label>
                <select
                    id="status"
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

                {/* Botón Guardar */}
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
