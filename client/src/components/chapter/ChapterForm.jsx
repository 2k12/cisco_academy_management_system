import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChapter } from "../../context/ChapterContext"; // Contexto para manejar capítulos
import { useCourse } from "../../context/CourseContext"; // Contexto para manejar capítulos

function ChapterForm({ onClose, chapter }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createChapter, updateChapter } = useChapter();
    const { courses, getCoursesDropdown } = useCourse();
    const [ selectedCourse, setSelectedCourse ] = useState("");




    // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Formato: YYYY-MM-DDTHH:MM
        return date.toISOString().slice(0, 16);
    };

    useEffect(() => {
        getCoursesDropdown();

        if (chapter) {
            setValue("chapter_name", chapter.chapter_name);
            setValue("hours", chapter.hours);
            setValue("start_date", formatDateForInput(chapter.start_date));
            setValue("end_date", formatDateForInput(chapter.end_date));
            // setValue("course_name", chapter.Courses[0]?.course_name);
            setSelectedCourse(chapter.Courses[0]?.course_id);
            // console.log(chapter.Courses[0]?.course_id);
        }
    }, [chapter, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (chapter) {
            // updateChapter({ ...data, id: chapter.chapter_id });
            updateChapter({ ...data, id: chapter.chapter_id, course_id: selectedCourse });
        } else {
            createChapter({ ...data, course_id: selectedCourse });
        }
        onClose();
    });

    const handleSelected = (id) => {
        setSelectedCourse(id);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Capítulo</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Capítulo"
                    {...register("chapter_name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="number"
                    placeholder="Horas"
                    {...register("hours")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha de Inicio"
                    {...register("start_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha de Fin"
                    {...register("end_date")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <select
                    // {...register("course_name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
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

export default ChapterForm;
