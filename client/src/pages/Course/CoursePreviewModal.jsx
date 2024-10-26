import { Link } from 'react-router-dom';


function CourseDetailsModal({ isOpen, onClose, course }) {
    if (!isOpen || !course) return null;

    // Función para definir los colores basados en el estado del curso
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
        if (!dateString) return "";
        const date = new Date(dateString);
        // Formato: YYYY-MM-DDTHH:MM
        return date.toISOString().slice(0, 16);
    };

    const handleMoreInfoClick = () => {
        history.push({
            pathname: '/preview-course',
            state: { course } // Pasa la información del curso a la nueva página
        });
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                {/* Título del curso con burbuja de estado */}
                <div className="flex justify-between items-center ">
                    <h2 className="text-4xl ">{course.course_name}</h2>
                    <span className={`ml-2 px-3 bg-gray-800  rounded-full ${getStatusStyles(course.status)}`}>
                        {course.status}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <h2>{formatDateForInput(course.Detail[0]?.createdAt)}</h2>
                </div>
                {/* Tres columnas con datos numéricos */}
                <h3 className='uppercase'> Participantes</h3> <br />
                <div className="grid grid-cols-3 gap-4  mb-5">
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail.num_enrolled}</span>
                        <span className="text-sm uppercase">Inscritos</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail.num_registered}</span>
                        <span className="text-sm uppercase">Matriculados</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2">
                        <span className="text-2xl font-bold">{course.Detail.num_failed}</span>
                        <span className="text-sm uppercase">REPROBADOS</span>
                    </div>
                </div>
                {/* Fechas del curso */}
                <div>
                    <h3 className='uppercase'>Fechas</h3>
                    <p>
                        <div className='p-2  border-b border-gray-200 dark:border-gray-600'>
                            <p><strong>Fecha Inscripciones: </strong>{new Date(course.registration_date).toLocaleDateString()} </p>
                            <p><strong>Fecha Matrículas: </strong>{new Date(course.enrollment_date).toLocaleDateString()} </p>
                            <p><strong>Fecha Incio: </strong>{new Date(course.start_date).toLocaleDateString()} </p>
                            <p><strong>Fecha Fin: </strong>{new Date(course.end_date).toLocaleDateString()} </p>
                        </div>
                    </p>
                </div>
                <div className=' mt-5'>
                    <h3 className='uppercase'>Descripción</h3>
                    <p>
                        {course.Detail != [] ? (
                            <div>
                                {/* {course.Detail.map((detail) => ( */}
                                    <div key={course.Detail.detail_id} className="p-2 border-b border-gray-200 dark:border-gray-600">
                                        <p><strong>Descripción:</strong> {course.Detail.course_description}</p>
                                        <p><strong>Costo:</strong> ${course.Detail.cost}</p>
                                        <p><strong>Horas:</strong> {course.Detail.total_hours}</p>
                                        <p><strong className='text-red-500'>Requerimiento Participantes: </strong> {course.Detail.participant_requeriment}</p>
                                    </div>
                                {/* ))} */}
                            </div>
                        ) : (
                            <span>No hay cursos relacionados</span>
                        )}
                    </p>
                </div>


                {/* Botón para cerrar el modal */}
                <button
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    onClick={onClose}
                >
                    Cerrar
                </button>
                {/* <button className="ml-2 px-4 py-2 bg-lime-500 text-white rounded-lg" onClick={handleMoreInfoClick}>
                    Más Información
                </button> */}
                <Link to={`/preview-course/${course.course_id}`} state={{ course }} className='ml-2 px-4 py-2 bg-green-600 text-white rounded-lg'>Ver más información del curso</Link>

            </div>
        </div>
    );
}

export default CourseDetailsModal;
