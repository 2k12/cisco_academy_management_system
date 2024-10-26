import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCertificate } from "../../context/CertificateContext"; // Contexto para manejar capítulos
import { useInstructor } from "../../context/InstructorContext";

function CertificateForm({ onClose, certificate }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createCertificate, updateCertificate } = useCertificate();
    const { instructors, getInstructorsDropdown } = useInstructor();
    const [selectedInstructor, setSelectedInstructor] = useState("");

    // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    // const formatDateForInput = (dateString) => {
    //     if (!dateString) return "";
    //     const date = new Date(dateString);
    //     // Formato: YYYY-MM-DDTHH:MM
    //     return date.toISOString().slice(0, 16);
    // };

    useEffect(() => {
        getInstructorsDropdown();

        if (certificate) {
            setValue("name", certificate.name);
            setValue("year_of_issue", certificate.year_of_issue);
            setValue("is_international", certificate.is_international);
            setValue("file_url", certificate.file_url);
            setSelectedInstructor(certificate.Instructors[0]?.instructor_id);
        }
    }, [certificate, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (certificate) {
            // !! falta editar solo se deja agregar 
            updateCertificate({ ...data, id: certificate.certificate_id, instructor_id : selectedInstructor});
        } else {
            createCertificate({ ...data, instructor_id: selectedInstructor });
        }
        onClose();
    });
    const handleSelected = (id) => {
        setSelectedInstructor(id);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Certificado</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Certificado"
                    {...register("name", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="number"
                    placeholder="Año de Emisión"
                    {...register("year_of_issue")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    <label className="text-white">
                        <input
                            type="checkbox"
                            value={true}
                            {...register("is_international")}
                            className="mr-2"
                        />
                        Internacional
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Url Archivo"
                    {...register("file_url")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <select
                    // {...register("course_name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedInstructor}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelected(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Curso</option>
                    {instructors.map((instructor) => (
                        <option key={instructor.instructor_id} value={instructor.instructor_id}>
                            {instructor.name}
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

export default CertificateForm;
