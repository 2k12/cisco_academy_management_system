import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDetail } from "../../context/DetailContext";
import { useCourse } from "../../context/CourseContext";
import { useInstructor } from "../../context/InstructorContext";
import { useModality } from "../../context/ModalityContext";

function DetailForm({ onClose, detail }) {
    const { register, handleSubmit, setValue } = useForm();
    const { courses, getCoursesDropdown } = useCourse();
    const { modalities, getModalitiesDropdown } = useModality();
    const { instructors, getInstructorsDropdown } = useInstructor();
    const { createDetail, updateDetail } = useDetail();

    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedModality, setSelectedModality] = useState("");


    useEffect(() => {

        getCoursesDropdown();
        getInstructorsDropdown();
        getModalitiesDropdown();

        if (detail) {
            setValue("course_description", detail.course_description);
            setValue("total_hours", detail.total_hours);
            setValue("instructor_hours", detail.instructor_hours);
            setValue("activities_hours", detail.activities_hours);
            // setValue("cost", detail.cost);
            setValue("num_registered", detail.num_registered);
            setValue("num_enrolled", detail.num_enrolled);
            setValue("num_failed", detail.num_failed);
            setValue("participant_requeriment", detail.participant_requeriment);
        
            // Verifica si detail.Courses existe y tiene al menos un elemento
            if (detail.Courses && detail.Courses.length > 0) {
                setSelectedCourse(detail.Courses[0].course_id);
            } else {
                setSelectedCourse(""); // O asigna un valor predeterminado si no hay relación
            }
        
            // Verifica si detail.Instructor existe antes de asignar su ID
            if (detail.Instructor) {
                setSelectedInstructor(detail.Instructor.instructor_id);
            } else {
                setSelectedInstructor(""); // O asigna un valor predeterminado si no hay relación
            }
        
            // Verifica si detail.Modalities existe y tiene al menos un elemento
            if (detail.Modalities && detail.Modalities.length > 0) {
                setSelectedModality(detail.Modalities[0].modality_id);
            } else {
                setSelectedModality(""); // O asigna un valor predeterminado si no hay relación
            }
        }
        
        //        // Verificar si existen los IDs en las listas
        //        setSelectedCourse(courses.some(course => course.course_id === detail.Courses[0]?.course_id) ? detail.Courses[0]?.course_id : "");
        //        setSelectedInstructor(instructors.some(inst => inst.instructor_id === detail.Instructor?.instructor_id) ? detail.Instructor?.instructor_id : "");
        //        setSelectedModality(modalities.some(mod => mod.modality_id === detail.Modalities[0]?.modality_id) ? detail.Modalities[0]?.modality_id : "");
        //    }
    }, [detail, setValue]);

    const handleSelected = (course_id) => {
        setSelectedCourse(course_id);
    };

    const handleSelectedInstructor = (instructor_id) => {
        setSelectedInstructor(instructor_id);
    };

    const handleSelectedModality = (modality_id) => {
        setSelectedModality(modality_id);
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

                <select
                    // {...register("instructor_id")}
                    {...register("modality_id")}
                    className="w-fu ll bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedModality}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelectedModality(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Modalidad</option>
                    {modalities.map((modality) => (
                        <option key={modality.modality_id} value={modality.modality_id}>
                            {modality.name}
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
                    type="number"
                    placeholder="Horas Instructor"
                    {...register("instructor_hours", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="number"
                    placeholder="Horas Actividades"
                    {...register("activities_hours", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                {/* <input
                    type="text"
                    placeholder="Costo"
                    {...register("cost")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                /> */}
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
