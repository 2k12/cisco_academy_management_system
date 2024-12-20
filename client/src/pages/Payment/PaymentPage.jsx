import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePayment } from "../../context/PaymentContext";
import RegisterPaymentModal from "../Payment/RegisterPaymentModal";
import ReportsModalityModal from "../Reports/ReportsModalityModal";

function ParticipantTypePage() {

    const { payments, getPayments, deletePayment, totalPages, currentPage, setCurrentPage, } = usePayment();
    const [searchTerm, setSearchTerm] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {

        getPayments({ search: searchTerm, page: currentPage });
        console.log(payments);
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

    const handleEdit = (payment) => {
        setSelectedPayment(payment);
        setIsRegisterModalOpen(true);
    };

    const handleDelete = (paymentId) => {
        deletePayment(paymentId);
    };

    return (
        <div className="p-6 bg-zinc-750 min-h-screen text-white overflow-hidden">
            <div className="flex justify-between mb-6">
                <input
                    type="text"
                    placeholder="Buscar  pago..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/3 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            setSelectedPayment(null);
                            setIsRegisterModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        Registrar Pago
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
                            <th scope="col" className="px-6 py-3">Participante</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Monto</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.payment_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {payment.payment_id}
                                </th>
                                <td className="px-6 py-4">{payment.Participants[0].name}</td>
                                <td className="px-6 py-4">{payment.description}</td>
                                <td className="px-6 py-4">{payment.amount}</td>
                                <td className="px-6 py-4 flex space-x-4"> {/* Cambié space-x-2 por space-x-4 */}
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(payment)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(payment.payment_id)}>
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

            < RegisterPaymentModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} payment={selectedPayment} />
            <ReportsModalityModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
        </div>
    );
}

export default ParticipantTypePage;
