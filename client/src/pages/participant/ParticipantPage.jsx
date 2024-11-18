import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParticipant } from "../../context/ParticipantContext";
import RegisterParticipantModal from "../participant/RegisterParticipantModal";
import ParticipantReportsModal from "./ParticipantReportModal";
import UploadExcelModal from "./UploadExcelModal";

function ParticipantPage() {

    const { participants, getParticipants, totalPages, currentPage, setCurrentPage } = useParticipant();
    const [searchTerm, setSearchTerm] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    useEffect(() => {
        getParticipants({ search: searchTerm, page: currentPage });

        console.log(participants);

    }, [searchTerm, currentPage]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEdit = (participant) => {
        setSelectedParticipant(participant);
        setIsRegisterModalOpen(true);
    };

    const handleDelete = (participantId) => {
        console.log(participantId);
        // deleteCertificates(participantId); // Llama a la función de eliminación
    };

    return (
        <div className="p-6 bg-zinc-750 min-h-screen text-white overflow-hidden">
            <div className="flex justify-between mb-6">
                <input
                    type="text"
                    placeholder="Buscar participantes..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/3 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"

                />
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            setSelectedParticipant(null);
                            setIsRegisterModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Registrar Participante
                    </button>
                    <button
                        onClick={() => setIsReportsModalOpen(true)}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Reportes
                    </button>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Cargar Excel
                    </button>
                </div>
            </div>

            <div className="scroll-hidden dark:bg-gray-800 relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] min-h-[600px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Curso Actual</th>
                            {/* <th scope="col" className="px-6 py-3">Edad</th> */}
                            <th scope="col" className="px-6 py-3">CI</th>
                            <th scope="col" className="px-6 py-3">Teléfono</th>
                            <th scope="col" className="px-6 py-3">Dirección</th>
                            <th scope="col" className="px-6 py-3">Institución</th>
                            <th scope="col" className="px-6 py-3">Tipo</th>
                            <th scope="col" className="px-6 py-3">Registrado</th>
                            <th scope="col" className="px-6 py-3">Matriculado</th>
                            <th scope="col" className="px-6 py-3">Aprobado</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant.participant_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {participant.participant_id}
                                </th>
                                <td className="px-6 py-4">{participant.name}</td>
                                <td className="px-6 py-4">{participant.Courses[0].course_name}</td>
                                {/* <td className="px-6 py-4">{participant.age}</td> */}
                                <td className="px-6 py-4">{participant.cid}</td>
                                <td className="px-6 py-4">{participant.phone}</td>
                                <td className="px-6 py-4">{participant.address}</td>
                                <td className="px-6 py-4">{participant.institution}</td>
                                {/* <td className="px-6 py-4">{participant.ParticipantType != "" || participant.ParticipantType != null ? participant.ParticipantType.name : ""}</td> */}
                                <td className="px-6 py-4">
                                    {participant.ParticipantType ? participant.ParticipantType.name : ""}
                                </td>
                                <td className="px-6 py-4">{participant.registered == 1 ? "Registrado" : "Pendiente"}</td>
                                <td className="px-6 py-4">{participant.enrolled == 1 ? "Matriculado" : "Pendiente"}</td>
                                <td className="px-6 py-4">{participant.approval == 1 ? "Aprobado" : "Pendiente"}</td>
                                {/* <td className="px-6 py-4">{participant.is_international == false ? "NO" : "SI"}</td> */}
                                {/* <td className="px-6 py-4">{certificate.file_url}</td> */}

                                <td className="px-6 py-4 flex space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FontAwesomeIcon icon={faUser} />
                                    </button>
                                    <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(participant)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(participant.participant_id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg bg-gray-600 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-500'}`}
                >
                    Anterior
                </button>
                <span className="text-lg">Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg bg-gray-600 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-500'}`}
                >
                    Siguiente
                </button>
            </div>

            <RegisterParticipantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} participant={selectedParticipant} />
            <ParticipantReportsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
            <UploadExcelModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />

        </div >
    );
}

export default ParticipantPage;
