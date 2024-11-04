import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCourse } from "../../context/CourseContext";
import { useInstructor } from "../../context/InstructorContext";
// import { useModality } from "../../context/ModalityContext";

function InstructorForm({ onClose, instructor }) {
    const { register, handleSubmit, setValue } = useForm();
    const { courses, getCoursesDropdown } = useCourse();
    const { createInstructor, updateInstructor } = useInstructor();
    const [selectedCourse, setSelectedCourse] = useState("");


    useEffect(() => {

        getCoursesDropdown();

        if (instructor) {
            setValue("identification_number", instructor.identification_number);
            setValue("name", instructor.name);
            setValue("phone", instructor.phone);
            setValue("email", instructor.email);
            setValue("ruc_number", instructor.ruc_number);
            setValue("banck_certificate_url", instructor.banck_certificate_url);
            setValue("cost_per_hour", instructor.cost_per_hour);

            if (instructor.Details && instructor.Details.length > 0) {
                setSelectedCourse(instructor.Details[0].Courses[0].course_id);
            } else {
                setSelectedCourse("");
            }
            console.log(instructor);
        }

    }, [instructor, setValue]);

    const handleSelected = (course_id) => {
        setSelectedCourse(course_id);
    };

    const onSubmit = handleSubmit((data) => {
        if (instructor) {
            updateInstructor({ ...data, id: instructor.instructor_id });
        } else {
            createInstructor(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Detalle</h2>
            <form onSubmit={onSubmit}>
                <select
                    {...register("course_id")}
                    className="w-fu ll bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedCourse}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelected(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Curso</option>
                    {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Identificación Instructor"
                    {...register("identification_number", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="RUC Instructor"
                    {...register("identification_number", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    {...register("phone", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="email"
                    placeholder="Email/Correo Electrónico"
                    {...register("email", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="number"
                    placeholder="Costo por Hora"
                    {...register("cost_per_hour", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Certificado Bancario"
                    {...register("banck_certificate_url", { required: true })}
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

export default InstructorForm;
