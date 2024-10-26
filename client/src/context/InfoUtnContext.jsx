import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createInfosUtnRequest,
    deleteInfosUtnRequest,
    getAllInfosUtnRequest,
    getInfosUtnRequest,
    updateInfosUtnRequest
} from "../api/infoutn";

const InfoUtnContext = createContext();

export const useInfoUtn = () => {
    const context = useContext(InfoUtnContext);

    if (!context) {
        throw new Error("useInfoUtn must be used within a InfoUtnProvider");
    }
    return context;
};

export function InfoUtnProvider({ children }) {
    const [infosutn, setInfosUtn] = useState([]);
    const [allinfosutnforreport, setAllInfosUtnForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createInfoUtn = async (info_utn) => {
        const res = await createInfosUtnRequest(info_utn);
        Swal.fire({ // Muestra el mensaje de éxito
            icon: 'success',
            title: 'Éxito',
            text: res.data.message,
        });
        console.log(res);
        getInfosUtn({ page: currentPage }); // Obtener la lista actualizada
    };

    const updateInfoUtn = async (info_utn) => {
        try {
            const res = await updateInfosUtnRequest(info_utn);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            // Aquí puedes actualizar el estado si lo deseas
            getInfosUtn({ page: currentPage }); // Obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    const getInfosUtn = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getInfosUtnRequest({ search, page, limit });
            setInfosUtn(res.data.infos_utn);

            // console.log(res.data.permissions);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllInfosUtn = async ({ search = '', page = 1, limit = 1000 }) => {
        try {
            const res = await getAllInfosUtnRequest({ search, page, limit });
            setAllInfosUtnForReport(res.data.infos_utn);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteInfosUtn = async (id) => {
        try {
            await deleteInfosUtnRequest(id);
            getInfosUtn({ page: currentPage }); // Vuelve a obtener la lista actualizada
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <InfoUtnContext.Provider
            value={{
                infosutn,
                createInfoUtn,
                updateInfoUtn,
                getInfosUtn,
                getAllInfosUtn,
                deleteInfosUtn,
                allinfosutnforreport,
                totalPages,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </InfoUtnContext.Provider>
    );
}
