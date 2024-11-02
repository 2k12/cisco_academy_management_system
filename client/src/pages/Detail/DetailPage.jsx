import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDetail } from "../../context/DetailContext";
import RegisterDetailModal from "../Detail/RegisterDetailModal";
import ReportsModalityModal from "../Reports/ReportsModalityModal";

function DetailPage() {
    const { getDetails, details, totalPages, currentPage, setCurrentPage, deleteDetailValues } = useDetail();
    const [searchTerm, setSearchTerm] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    useEffect(() => {
        getDetails({ search: searchTerm, page: currentPage });
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

    const handleEdit = (detail) => {
        setSelectedDetail(detail);
        setIsRegisterModalOpen(true);
    };

    const handleDelete = (detailId) => {
        deleteDetailValues(detailId); 
    };

    return (
        <div className="p-6 bg-zinc-750 min-h-screen text-white overflow-hidden">
            <div className="flex justify-between mb-6">
                <input
                    type="text"
                    placeholder="Buscar Detalle"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/3 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            setSelectedDetail(null);
                            setIsRegisterModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Registrar Detalle
                    </button>
                    <button
                        onClick={() => setIsReportsModalOpen(true)}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Reportes
                    </button>
                </div>
            </div>

            <div className="scroll-hidden dark:bg-gray-800 relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] min-h-[600px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Curso</th>
                            <th scope="col" className="px-6 py-3">Instructor</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Horas Totales</th>
                            <th scope="col" className="px-6 py-3">Costo</th>
                            <th scope="col" className="px-6 py-3">N. Registrados</th>
                            <th scope="col" className="px-6 py-3">N. Matriculados</th>
                            <th scope="col" className="px-6 py-3">N. Reprobados</th>
                            <th scope="col" className="px-6 py-3">Requerimiento Participantes</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail) => (
                            <tr key={detail.detail_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {detail.detail_id ?? ""}
                                </th>
                                <td className="px-6 py-4">{detail.Courses[0]?.course_name ?? ""}</td>
                                <td className="px-6 py-4">{detail.Instructor?.name ?? ""}</td>
                                <td className="px-6 py-4">{detail.course_description ?? ""}</td>
                                <td className="px-6 py-4">{detail.total_hours ?? ""}</td>
                                <td className="px-6 py-4">{detail.cost ?? ""}</td>
                                <td className="px-6 py-4">{detail.num_registered ?? ""}</td>
                                <td className="px-6 py-4">{detail.num_enrolled ?? ""}</td>
                                <td className="px-6 py-4">{detail.num_failed ?? ""}</td>
                                <td className="px-6 py-4">{detail.participant_requeriment ?? ""}</td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(detail)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(detail.detail_id)}>
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

            <RegisterDetailModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} detail={selectedDetail} />
            <ReportsModalityModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
        </div>
    );
}

export default DetailPage;
