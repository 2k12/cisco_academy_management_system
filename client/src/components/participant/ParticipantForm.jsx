import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParticipantType } from "../../context/ParticipantTypeContext"; // Contexto para manejar capítulos
import { useCourse } from "../../context/CourseContext";
import { useParticipant } from "../../context/ParticipantContext"; // Contexto para manejar capítulos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2"; // Importa SweetAlert

function ParticipantForm({ onClose, participant }) {
    const { register, handleSubmit, setValue } = useForm();
    const { participant_types, getParticipantTypesDropdown } = useParticipantType();
    const { courses, getCoursesDropdown } = useCourse();

    const { createParticipant, updateParticipant } = useParticipant();
    const [selectedParticipantType, setSelectedParticipantType] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");




    // // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    // const formatDateForInput = (dateString) => {
    //     if (!dateString) return "";
    //     const date = new Date(dateString);
    //     // Formato: YYYY-MM-DDTHH:MM
    //     return date.toISOString().slice(0, 16);
    // };

    useEffect(() => {
        getParticipantTypesDropdown();
        getCoursesDropdown();

        if (participant) {

            console.log(participant);
            
            setValue("name", participant.name);
            setValue("age", participant.age);
            setValue("cid", participant.cid);
            setValue("phone", participant.phone);
            setValue("address", participant.address);
            setValue("institution", participant.institution);
            setValue("file_url", participant.file_url);
            setValue("certificate_required", participant.certificate_required);
            setValue("registered", participant.registered);
            setValue("enrolled", participant.enrolled);
            setValue("approval", participant.approval);
            setValue("total_payment", participant.total_payment);
            setValue("active", participant.active);

            // setValue("course_name", chapter.Courses[0]?.course_name);

            if (participant.ParticipantType) {
                setSelectedParticipantType(participant.ParticipantType.participant_type_id);
            } else {
                setSelectedParticipantType(""); // O asigna un valor predeterminado si no hay relación
            }
            // ! setSelectedParticipantType(participant.ParticipantType.participant_type_id);

            setSelectedCourse(participant.Courses[0]?.course_id);
            // console.log(chapter.Courses[0]?.course_id);
        }
    }, [participant, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (participant) {
            updateParticipant({ ...data, id:participant.participant_id , course_id: selectedCourse });
            // updateChapter({ ...data, id: participant.participant_id, course_id: selectedCourse });
        } else {
            createParticipant({ ...data });
        }
        onClose();
    });


    const handleSelected = (id) => {
        setSelectedParticipantType(id);
    };

    const handleSelectedCourse = (course_id) => {
        setSelectedCourse(course_id);
    };

    const handleCopy = () => {
        const urlInput = document.getElementById("file_url_input");
        if (urlInput) {
            navigator.clipboard.writeText(urlInput.value);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "URL copiada al portapapeles",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Participante</h2>
            <form onSubmit={onSubmit}>
                {participant && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        <label className="text-green-500">
                            <input
                                type="checkbox"
                                value={true}
                                {...register("active")}
                                className="mr-2"
                            />
                            Participante Activo
                        </label>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Nombre del Participante"
                    {...register("name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                {/* <input
                    type="number"
                    placeholder="Edad"
                    {...register("age")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                /> */}
                <input
                    type="text"
                    placeholder="Número de Cédula"
                    {...register("cid")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    {...register("phone")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    {...register("address")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Institución"
                    {...register("institution")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <select
                    // {...register("participant_type_id")}
                    className="w-fu ll bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedParticipantType}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelected(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Tipo de Participante</option>
                    {participant_types.map((participant_type) => (
                        <option key={participant_type.participant_type_id} value={participant_type.participant_type_id}>
                            {participant_type.name}
                        </option>
                    ))}
                </select>
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
                <div className="flex flex-wrap gap-2 mt-2">
                    <label className="text-white">
                        <input
                            type="checkbox"
                            value={true}
                            {...register("certificate_required")}
                            className="mr-2"
                        />
                        Requiere Certificado
                    </label>
                </div>
                {/* <input
                    type="text"
                    placeholder="Url del Archivo"
                    {...register("file_url")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                /> */}
                <div className="flex items-center bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                    <input
                        type="text"
                        id="file_url_input"
                        placeholder="Url del Archivo"
                        {...register("file_url")}
                        className="w-full bg-transparent text-white outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="ml-2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <FontAwesomeIcon icon={faCopy} className="mr-2 text-blue-500" />

                    </button>
                </div>
                {/* check de registrado */}
                {/* check de matriculado */}
                {/* check de aprobado */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <label className="text-white">
                        <input
                            type="checkbox"
                            value={true}
                            {...register("registered")}
                            className="mr-2"
                        />
                        Registrado
                    </label>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <label className="text-white">
                        <input
                            type="checkbox"
                            value={true}
                            {...register("enrolled")}
                            className="mr-2"
                        />
                        Matriculado
                    </label>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    <label className="text-white">
                        <input
                            type="checkbox"
                            value={true}
                            {...register("approval")}
                            className="mr-2"
                        />
                        Aprobado
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Pago Total"
                    {...register("total_payment")}
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

export default ParticipantForm;
