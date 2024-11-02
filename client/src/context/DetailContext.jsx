import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createDetailRequest,
    deleteDetailRequest,
    getDetailsRequest
} from "../api/detail";

const DetailContext = createContext();

export const useDetail = () => {
    const context = useContext(DetailContext);

    if (!context) {
        throw new Error("useDetail must be used within a DetailProvider");
    }
    return context;
};

export function DetailProvider({ children }) {
    const [details, setDetails] = useState([]);
    // const [alldetailvaluesforreport, setAllDetailValuesForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createDetail = async (detail) => {
        const res = await createDetailRequest(detail);
        console.log(res);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: res.data.message,
        });
        // Aquí puedes actualizar el estado si lo deseas
        getDetails({ page: currentPage }); // Obtener la lista actualizada
    };

    const getDetails = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getDetailsRequest({ search, page, limit });
            setDetails(res.data.details);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDetails = async (id) => {
        try {
            const res = await deleteDetailRequest(id);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            getDetails({ page: currentPage }); 
        } catch (error) {
            console.log(error);
        }
    };

    
    //   const updateDetailValue = async (detail_value) => {
    //     try {
    //       const res = await updateDetailValuesRequest(detail_value);
    //       Swal.fire({ // Muestra el mensaje de éxito
    //         icon: 'success',
    //         title: 'Éxito',
    //         text: res.data.message,
    //       });
    //       console.log(res);
    //       // Aquí puedes actualizar el estado si lo deseas
    //       getDetailValues({ page: currentPage }); // Obtener la lista actualizada
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    
    // const getAllDetailValues = async ({ search = '', page = 1, limit = 1000 }) => {
    //     try {
    //         const res = await getAllDetailValuesRequest({ search, page, limit });
    //         setAllDetailValuesForReport(res.data.detail_values);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    return (
        <DetailContext.Provider
            value={{
                details,
                createDetail,
                getDetails,
                deleteDetails,
                // updateDetailValue,
                // getAllDetailValues,
                // alldetailvaluesforreport,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </DetailContext.Provider>
    );
}
