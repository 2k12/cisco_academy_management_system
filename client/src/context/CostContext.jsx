import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    getCostsRequest,
    // getAllCostsRequest,
    createCostRequest,
    updateCostRequest,
    deleteCostRequest
} from "../api/cost";

const CostContext = createContext();

export const useCosts = () => {
    const context = useContext(CostContext);

    if (!context) {
        throw new Error("useCosts must be used within a CostsProvider");
    }
    return context;
};

export function CostProvider({ children }) {
    const [costs, setCosts] = useState([]);
    // const [alldetailvaluesforreport, setAllDetailValuesForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createCost = async (cost) => {
        try {
            const res = await createCostRequest(cost);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            // Aquí puedes actualizar el estado si lo deseas
            getCosts({ page: currentPage }); // Obtener la lista actualizada
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                // text: error.response?.data?.message || `Ha ocurrido un error ${error}`,
                text: `No existe un detalle de Curso, cree un Detalle del Curso Seleccionado`,
            });
        };
    }


    const updateCost = async (cost) => {
        try {
            const res = await updateCostRequest(cost);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            // Aquí puedes actualizar el estado si lo deseas
            getCosts({ page: currentPage }); // Obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };


    const getCosts = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getCostsRequest({ search, page, limit });
            setCosts(res.data.costs);
            // console.log(res.data.permissions);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    // const getAllDetailValues = async ({ search = '', page = 1, limit = 1000 }) => {
    //     try {
    //         const res = await getAllDetailValuesRequest({ search, page, limit });
    //         setAllDetailValuesForReport(res.data.detail_values);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const deleteCost = async (id) => {
        try {
            await deleteCostRequest(id);
            getCosts({ page: currentPage }); // Vuelve a obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CostContext.Provider
            value={{
                costs,
                deleteCost,
                createCost,
                updateCost,
                getCosts,
                // getAllDetailValues,
                // deleteDetailValues,
                // alldetailvaluesforreport,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </CostContext.Provider>
    );
}
