import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import CourseReportModal from "./CourseReportModal";


const PreviewCoursePage = () => {
    const location = useLocation();
    const { course } = location.state || {}; // Obtiene el curso del estado pasado

    // const [selectedCourse, setSelectedCourse] = useState(null);
    // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);


    // Si no hay curso, puedes manejar el caso adecuadamente
    if (!course) {
        return <div>No se encontró información del curso.</div>;
    }


    console.log(course);

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

    // Estado para manejar la expansión de la sección de capítulos
    const [isChaptersOpen, setChaptersOpen] = useState(false);
    const [isParticipantsOpen, setParticipantsOpen] = useState(false);

    const toggleChapters = () => {
        setChaptersOpen(!isChaptersOpen);
    };

    const toggleParticipants = () => {
        setParticipantsOpen(!isParticipantsOpen);
    };

    const parseDays = (days) => {
        const dayMap = {
            '1': 'Lunes',
            '2': 'Martes',
            '3': 'Miércoles',
            '4': 'Jueves',
            '5': 'Viernes',
            '6': 'Sábado',
            '7': 'Domingo'
        };

        // Dividir si los días están en un formato como "1-2"
        return days.split('-').map(day => dayMap[day.trim()]).join(', ');
    };

    return (
        <div className='p-10'>



            <div className="container mx-auto mt-10 px-4">
                <div className="flex justify-between items-center mb-4">
                    {/* Botón de regresar */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Regresar
                    </button>

                    {/* Botón de descargar reporte */}
                    <button
                        // onClick={() => { /* Aquí pondremos la lógica de descarga después */ }}
                        onClick={() => setIsReportsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Descargar Anexos
                    </button>
                </div>

                <div className="flex justify-between items-center ">
                    <h2 className="text-4xl ">{course.course_name}</h2>
                    <span className={`ml-2 px-3 bg-gray-800 rounded-full ${getStatusStyles(course.status)}`}>
                        {course.status}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <h2>{formatDateForInput(course.Detail.createdAt)}</h2>
                </div>

                {/* Tres columnas con datos numéricos */}
                {/* <h3 className='uppercase text-xl'>Participantes</h3> <br /> */}
                <div className="grid grid-cols-3 gap-10 mb-5">
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-5">
                        <span className="text-5xl font-bold">{course.Detail.num_enrolled}</span>
                        <span className="text-sm uppercase mt-2">Inscritos</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-5">
                        <span className="text-5xl font-bold">{course.Detail.num_registered}</span>
                        <span className="text-sm uppercase mt-2">Matriculados</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-5">
                        <span className="text-5xl font-bold">{course.Detail.num_failed}</span>
                        <span className="text-sm uppercase mt-2">REPROBADOS</span>
                    </div>
                </div>
                {/* Fechas del curso */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <h3 className='uppercase text-xl mb-4'>Fechas Importantes</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                <strong>Fecha Inscripciones: </strong> {new Date(course.registration_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                <strong>Fecha Matrículas: </strong> {new Date(course.enrollment_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                <strong>Fecha Inicio: </strong> {new Date(course.start_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                <strong>Fecha Fin: </strong> {new Date(course.end_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Descripción del curso */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className='uppercase text-xl mb-4'>Descripción del Curso</h3>
                    {course.Details && course.Details != [] ? (
                        <div className="space-y-6">
                            {/* {course.Details.map((detail) => ( */}
                            <div key={course.Detail.detail_id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    <strong>Descripción:</strong> {course.Detail.course_description}
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    <strong>Costo:</strong> <span className="text-black dark:text-white">${course.Detail.cost}</span>
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    <strong>Horas:</strong> {course.Detail.total_hours}
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    <strong>Modalidad/es:</strong>
                                    {course.Detail.Modalities && course.Detail.Modalities.length > 0 ? (
                                        course.Detail.Modalities.map((modality, index) => (
                                            <span key={index} className="inline-block bg-trnasparent text-blue-700 px-3 py-1  font-medium mr-2">
                                                {modality.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span>No disponible</span>
                                    )}
                                </p>
                                <p className="text-lg font-semibold text-red-500 dark:text-red-400">
                                    <strong>Requerimiento Participantes:</strong> {course.Detail.participant_requeriment}
                                </p>
                            </div>
                            {/* ))} */}
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                            <span className="text-gray-500 dark:text-gray-300">No hay cursos relacionados</span>
                        </div>
                    )}
                </div>

                <div className='mt-10'>
                    <h3 className='uppercase text-xl mb-4'>Horario</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {course.Detail && course.Detail != [] ? (
                            // course.Details.map((detail) => (
                            <div key={course.Detail.detail_id} className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                                <div className="p-6">
                                    {course.Detail.Schedules && course.Detail.Schedules.length > 0 ? (
                                        course.Detail.Schedules.map((schedule, index) => (
                                            <div key={index} className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-2 shadow-inner">
                                                <div className="flex-shrink-0">
                                                    <div className="bg-blue-500 text-white p-3 rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 0v4M3 9h18M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">Días: {parseDays(schedule.days)}</p>
                                                    <p className="text-gray-600 dark:text-gray-300"><strong>Hora Inicio:</strong> {schedule.start_time}</p>
                                                    <p className="text-gray-600 dark:text-gray-300"><strong>Hora Fin:</strong> {schedule.end_time}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No hay horarios disponibles</p>
                                    )}
                                </div>
                            </div>
                            // ))
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">información no disponible</span>
                        )}
                    </div>
                </div>

                <div className="container mx-auto mt-10 ">
                    {/* Detalles del Curso */}
                    <h3 className='uppercase text-xl mb-4'>DETALLES</h3>

                    {course.Detail && course.Detail != [] > 0 ? (
                        // course.Details.map((detail) => (
                        <div key={course.Detail.detail_id} className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 mb-8">
                            <div className="p-6">
                                {/* Información Financiera */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner"> */}
                                    <div className="bg-transparent p-4 rounded-lg shadow-inner">
                                        <h4 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3">
                                            <i className="fas fa-money-bill-wave text-green-500"></i> Información Financiera
                                        </h4>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Total Recaudado:</strong> ${course.Detail.DetailValue.total_amount}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Pago Instructor:</strong> ${course.Detail.DetailValue.instructor_payment}
                                        </p>

                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Total Balance:</strong> ${course.Detail.DetailValue.total_amount - course.Detail.DetailValue.instructor_payment}
                                        </p>
                                    </div>

                                    {/* Información del Instructor */}
                                    {/* <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner"> */}
                                    <div className="bg-transparent p-4 rounded-lg shadow-inner">
                                        <h4 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3">
                                            <i className="fas fa-chalkboard-teacher text-blue-500"></i> Información del Instructor
                                        </h4>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Nombre:</strong> {course.Detail.Instructor.name}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Email:</strong> {course.Detail.Instructor.email}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Teléfono:</strong> {course.Detail.Instructor.phone}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>Cédula:</strong> {course.Detail.Instructor.identification_number}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                            <strong>RUC:</strong> {course.Detail.Instructor.ruc_number}
                                        </p>

                                        {/* Certificados del Instructor */}
                                        <div className="mt-4">
                                            <h5 className="text-lg font-bold text-gray-600 dark:text-gray-300 mb-2">
                                                <i className="fas fa-certificate text-yellow-500"></i> Certificados
                                            </h5>
                                            {course.Detail.Instructor.Certificates && course.Detail.Instructor.Certificates.length > 0 ? (
                                                course.Detail.Instructor.Certificates.map((certificate, index) => (
                                                    <div key={index} className="flex items-center bg-gray-200 dark:bg-gray-600 p-3 rounded-lg mb-2 shadow">
                                                        <i className="fas fa-file-alt text-gray-600 dark:text-gray-300 mr-3"></i>
                                                        <a href={certificate.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">
                                                            Ver Certificado {index + 1}
                                                        </a>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 dark:text-gray-300">No hay certificados disponibles</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // ))
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400">Información no disponible</span>
                    )}
                </div>


                {/* Sección de Capítulos */}
                <div className='mt-5 p-2 border-b border-gray-200 dark:border-gray-600'>
                    <h3 className='uppercase flex items-center cursor-pointer text-xl' onClick={toggleChapters}>
                        Capítulos
                        <span className={`ml-2 transition-transform ${isChaptersOpen ? 'rotate-180' : 'rotate-0'}`}>
                            ▼
                        </span>
                    </h3>
                    {isChaptersOpen && (
                        <div className='mt-2 p-4 border border-gray-800 bg-gray-800 rounded-lg'>
                            {course.Chapters && course.Chapters.length > 0 ? (
                                course.Chapters.map((chapter) => (
                                    // <div key={chapter.chapter_id} className="p-2 border-b border-gray-200">
                                    <div key={chapter.chapter_id} className="p-2">
                                        <p><strong>Capítulo:</strong> {chapter.chapter_name}</p>
                                        <p><strong>Horas:</strong> {chapter.hours} horas</p>
                                    </div>
                                ))
                            ) : (
                                <span>No hay capítulos disponibles</span>
                            )}
                        </div>
                    )}
                </div>
                {/* Sección de Participantes */}
                <div className='mt-5'>
                    <h3 className='uppercase flex items-center cursor-pointer p-2 text-white text-xl' onClick={toggleParticipants}>
                        Participantes
                        <span className={`ml-2 transition-transform ${isParticipantsOpen ? 'rotate-180' : 'rotate-0'}`}>
                            ▼
                        </span>
                    </h3>
                    {isParticipantsOpen && (
                        <div className='mt-2 p-4  bg-gray-800 rounded-lg shadow'>
                            {course.Participants && course.Participants.length > 0 ? (
                                // <table className="min-w-full text-left table-auto border-collapse">
                                //     <thead>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Nombre</th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Tipo Participante</th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Facultad</th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Carrera</th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Empresa</th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-white">Estado Aprobación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {course.Participants.map((participant) => (
                                            // <tr key={participant.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`}>
                                            <tr key={participant.id} className={`border-b bg-gray-100 dark:bg-gray-900`}>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">{participant.name}</td>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">
                                                    {participant.ParticipantType ? participant.ParticipantType.name : 'Tipo no disponible'}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">
                                                    {participant.InfoUtn ? participant.InfoUtn.faculty : 'No registrado'}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">
                                                    {participant.InfoUtn ? participant.InfoUtn.degree : 'No registrado'}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">
                                                    {participant.InfoUtn ? participant.institution : 'No registrado'}
                                                </td>
                                                <td className="px-4 py-2 text-gray-700 dark:text-white">
                                                    <div className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-center">
                                                        {participant.approval === false ? "Pendiente" : "Aprobó"}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            ) : (
                                <span className="text-gray-500">No hay participantes disponibles</span>
                            )}
                        </div>
                    )}
                </div>

                <div className='h-52'>

                </div>
            </div>

            <CourseReportModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} course={course} />

        </div>
    );
};

export default PreviewCoursePage;
