import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createPaymentTypesRequest,
    deletePaymentTypesRequest,
    // getPaymentTypeRequest,
    getPaymentTypesDropdownRequest,
    getPaymentTypesRequest,
    updatePaymentTypesRequest
} from "../api/payment_type";

const PaymentTypeContext = createContext();

export const usePaymentType = () => {
    const context = useContext(PaymentTypeContext);

    if (!context) {
        throw new Error("usePaymentType must be used within a PaymentTypeProvider");
    }
    return context;
};

export function PaymentTypeProvider({ children }) {
    const [paymentTypes, setPaymentTypes] = useState([]);
    //   const [allpaymentTypesforreport, setAllPaymentTypesForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createPaymentType = async (paymentType) => {
        try {
            const res = await createPaymentTypesRequest(paymentType);
            console.log(res);
            getPaymentTypes({ page: currentPage }); // Obtener la lista actualizada      
        } catch (error) {
            console.log(error);
        }

    };

    const updatePaymentType = async (paymentType) => {
        try {
            const res = await updatePaymentTypesRequest(paymentType);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            // Aquí puedes actualizar el estado si lo deseas
            getPaymentTypes({ page: currentPage }); // Obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    const getPaymentTypes = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getPaymentTypesRequest({ search, page, limit });
            setPaymentTypes(res.data.payment_types);
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
    
    const getPaymentTypesDropdown = async () => {
        try {
            const res = await getPaymentTypesDropdownRequest();
            setPaymentTypes(res.data.payment_types);
        } catch (error) {
            console.log(error);
        }
    };


    const deletePaymentTypes = async (id) => {
        try {
            await deletePaymentTypesRequest(id);
            getPaymentTypes({ page: currentPage }); // Vuelve a obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PaymentTypeContext.Provider
            value={{
                paymentTypes,
                getPaymentTypesDropdown,
                createPaymentType,
                updatePaymentType,
                getPaymentTypes,
                deletePaymentTypes,
                // getAllChapters,
                // allchaptersforreport,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </PaymentTypeContext.Provider>
    );
}
