import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDetail } from "../../context/DetailContext";
import { useCourse } from "../../context/CourseContext";
import { useInstructor } from "../../context/InstructorContext";

function DetailForm({ onClose, detail }) {
    const { register, handleSubmit, setValue } = useForm();
    const { courses, getCoursesDropdown } = useCourse();
    const { instructors, getInstructorsDropdown } = useInstructor();
    const { createDetail, updateDetail } = useDetail();

    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");


    useEffect(() => {
        getCoursesDropdown();
        getInstructorsDropdown();
        if (detail) {
            setValue("course_description", detail.course_description);
            setValue("total_hours", detail.total_hours);
            setValue("cost", detail.cost);
            setValue("num_registered", detail.num_registered);
            setValue("num_enrolled", detail.num_enrolled);
            setValue("num_failed", detail.num_failed);
            setValue("participant_requeriment", detail.participant_requeriment);

            setSelectedCourse(detail.Courses[0]?.course_id);
            setSelectedInstructor(detail.Instructor.instructor_id);

        }
    }, [detail, setValue]);

    const handleSelected = (course_id) => {
        setSelectedCourse(course_id);
    };

    const handleSelectedInstructor = (instructor_id) => {
        setSelectedInstructor(instructor_id);
    };

    const onSubmit = handleSubmit((data) => {
        if (detail) {
            updateDetail({ ...data, id: detail.detail_id });
        } else {
            createDetail(data);
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
                <textarea
                    rows={3}
                    placeholder="Descripción"
                    {...register("course_description")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                ></textarea>
                <select
                    {...register("instructor_id")}
                    className="w-fu ll bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedInstructor}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelectedInstructor(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Instructor</option>
                    {instructors.map((instructor) => (
                        <option key={instructor.instructor_id} value={instructor.instructor_id}>
                            {instructor.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Total Horas"
                    {...register("total_hours", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Costo"
                    {...register("cost")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="number"
                    placeholder="Numero Registrados"
                    {...register("num_registered")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="number"
                    placeholder="Numero Matriculados"
                    {...register("num_enrolled")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="number"
                    placeholder="Numero Reprobados"
                    {...register("num_failed")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Requerimiento Participante"
                    {...register("participant_requeriment")}
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

export default DetailForm;
