import { Link } from 'react-router-dom';

function CourseDetailsModal({ isOpen, onClose, course }) {
    if (!isOpen || !course) return null;

    console.log(course);

    // Define styles based on the course status
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Aprobado':
                return 'text-green-500 ';
            case 'Rechazado':
                return 'text-yellow-500 ';
            case 'Iniciado':
                return 'text-orange-500 ';
            case 'Finalizado':
                return 'text-red-500 ';
            default:
                return 'text-gray-500 ';
        }
    };

    const formatDateForInput = (dateString) => {
        console.log(dateString);
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl ">{course.course_name || "No asignado"}</h2>
                    <span className={`ml-2 px-3 bg-gray-800 rounded-full ${getStatusStyles(course.status)}`}>
                        {course.status || "No asignado"}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <h2>{formatDateForInput(course.createdAt)}</h2>
                </div>

                <h3 className="uppercase">Participantes</h3> <br />
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail?.num_enrolled || "..."}</span>
                        <span className="text-sm uppercase">Inscritos</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail?.num_registered || "..."}</span>
                        <span className="text-sm uppercase">Matriculados</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail?.num_failed || "..."}</span>
                        <span className="text-sm uppercase">Reprobados</span>
                    </div>
                </div>

                <div>
                    <h3 className="uppercase">Fechas</h3>
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                        <p><strong>Fecha Inscripciones: </strong>{course.start_registration_date ? new Date(course.start_registration_date).toLocaleDateString() : "No asignado"} - {course.end_registration_date ? new Date(course.end_registration_date).toLocaleDateString() : "No asignado"}</p>
                        <p><strong>Fecha Inicio Matrículas: </strong>{course.start_enrollment_date ? new Date(course.start_enrollment_date).toLocaleDateString() : "No asignado"} - {course.end_enrollment_date ? new Date(course.end_enrollment_date).toLocaleDateString() : "No asignado"}</p>
                        <p><strong>Fecha Inicio Curso: </strong>{course.start_date ? new Date(course.start_date).toLocaleDateString() : "No asignado"}</p>
                        <p><strong>Fecha Fin Curso: </strong>{course.end_date ? new Date(course.end_date).toLocaleDateString() : "No asignado"}</p>
                    </div>
                </div>

                <div className="mt-5">
                    <h3 className="uppercase">Descripción</h3>
                    {course.Detail ? (
                        <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                            <p><strong>Descripción:</strong> {course.Detail.course_description || "No asignado"}</p>
                            {/* <p><strong>Costo:</strong> ${course.Detail.cost || "No asignado"}</p> */}
                            {/* Display each related cost */}
                            {course.Detail?.Costs && course.Detail.Costs.length > 0 && (
                                <div className="mt-5">
                                    <h3 className="uppercase">Costos Relacionados</h3>
                                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                                        {course.Detail.Costs.map((cost) => (
                                            <div key={cost.cost_id} className="p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                                {/* <p><strong>ID:</strong> {cost.cost_id}</p> */}
                                                <p><strong>Amount:</strong> ${cost.amount}</p>
                                                <p><strong>Description:</strong> {cost.description}</p>
                                                {/* <p><strong>Fecha de Creación:</strong> {new Date(cost.createdAt).toLocaleDateString()}</p> */}
                                                {/* <p><strong>Fecha de Actualización:</strong> {new Date(cost.updatedAt).toLocaleDateString()}</p> */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p><strong>Horas:</strong> {course.Detail.total_hours || "No asignado"}</p>
                            <p><strong className="text-red-500">Requerimiento Participantes: </strong> {course.Detail.participant_requeriment || "No asignado"}</p>
                        </div>
                    ) : (
                        <span>No hay cursos relacionados</span>
                    )}
                </div>

                <button
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    onClick={onClose}
                >
                    Cerrar
                </button>
                <Link
                    to={`/preview-course/${course.course_id}`}
                    state={{ course }}
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    Ver más información del curso
                </Link>
            </div>
        </div>
    );
}

export default CourseDetailsModal;
