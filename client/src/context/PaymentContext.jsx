import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createPaymentsRequest,
    deletePaymentsRequest,
    // getPaymentRequest,
    // getPaymentsDropdownRequest,
    getPaymentsRequest,
    updatePaymentsRequest
} from "../api/payment";

const PaymentContext = createContext();

export const usePayment = () => {
    const context = useContext(PaymentContext);

    if (!context) {
        throw new Error("usePayment must be used within a PaymentProvider");
    }
    return context;
};

export function PaymentProvider({ children }) {
    const [payments, setPayments] = useState([]);
    //   const [allpaymentTypesforreport, setAllPaymentTypesForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createPayment = async (payment) => {
        try {
            const res = await createPaymentsRequest(payment);
            console.log(res);
            getPayments({ page: currentPage }); // Obtener la lista actualizada      
        } catch (error) {
            console.log(error);
        }

    };

    const updatePayment = async (payment) => {
        try {
            const res = await updatePaymentsRequest(payment);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            // Aquí puedes actualizar el estado si lo deseas
            getPayments({ page: currentPage }); // Obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    const getPayments = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getPaymentsRequest({ search, page, limit });
            setPayments(res.data.payments);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    //   const getAllPaymentTypes = async ({ search = '', page = 1, limit = 1000 }) => {
    //     try {
    //       const res = await getAllChaptersRequest({ search, page, limit });
    //       setAllChaptersForReport(res.data.chapters);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    // const getPaymentTypesDropdown = async () => {
    //     try {
    //         const res = await getPaymentTypesDropdownRequest();
    //         setPaymentTypes(res.data.courses);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    const deletePayment = async (id) => {
        try {
            await deletePaymentsRequest(id);
            getPayments({ page: currentPage }); // Vuelve a obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PaymentContext.Provider
            value={{
                createPayment,
                payments,
                getPayments,
                deletePayment,
                updatePayment,
                // getPaymentTypesDropdown,
                // getAllChapters,
                // allchaptersforreport,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
}
