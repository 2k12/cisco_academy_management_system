import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCosts } from "../../context/CostContext"; // Contexto para manejar capítulos
import { useCourse } from "../../context/CourseContext"; // Contexto para manejar capítulos

function CostForm({ onClose, cost }) {
    const { register, handleSubmit, setValue } = useForm();
    // const { createCost, updateCost } = useCosts();
    const { createCost } = useCosts();
    const { courses, getCoursesDropdown } = useCourse();
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        getCoursesDropdown();

        if (cost) {
            setValue("amount", cost.amount);
            setValue("description", cost.description);
            // setValue("course_id", selectedCourse.course_id);
            // setValue("course_name", chapter.Courses[0]?.course_name);
            setSelectedCourse(selectedCourse.course_id);
            // console.log(chapter.Courses[0]?.course_id);
        }
        // }, [cost, setValue]);
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (cost) {
            // updateChapter({ ...data, id: chapter.chapter_id, course_id: selectedCourse });
        } else {
            // createCost({ ...data });
            createCost({ ...data});

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
                    placeholder="Costo Curso"
                    {...register("amount")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <textarea
                    rows={3}
                    placeholder="Descripción"
                    {...register("description")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                ></textarea>

                <select
                    // {...register("course_name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedCourse}
                    {...register("course_id")}
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

export default CostForm;
