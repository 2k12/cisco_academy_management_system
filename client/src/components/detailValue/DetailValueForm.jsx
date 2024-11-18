import { useForm } from "react-hook-form";
import { useEffect, useState} from "react";
import { useDetailValues } from "../../context/DetailValuesContext"; // Contexto para manejar capítulos
import { useCourse } from "../../context/CourseContext";
function DetailValueForm({ onClose, detail_value }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createDetailValue, updateDetailValue } = useDetailValues();
    const { courses, getCoursesDropdown } = useCourse();


    const [selectedCourse, setSelectedCourse] = useState("");


    useEffect(() => {
        getCoursesDropdown();

        if (detail_value) {
            setValue("total_amount", detail_value.total_amount);
            setValue("instructor_payment", detail_value.instructor_payment);
            setValue("balance", detail_value.balance);
        }
    }, [detail_value, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (detail_value) {
            updateDetailValue({ ...data, id: detail_value.detail_value_id });
        } else {
            createDetailValue(data);
        }
        onClose();
    });

    const handleSelectedCourse = (course_id) => {
        setSelectedCourse(course_id);
    };


    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Detalle de Valores</h2>
            <form onSubmit={onSubmit}>
                <select
                    // {...register("course_id")} 
                    className="w-fu ll bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedCourse}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelectedCourse(e.target.value);
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
                    placeholder="Total Recaudado"
                    {...register("total_amount", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Pago Instructor"
                    {...register("instructor_payment")}
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

export default DetailValueForm;
