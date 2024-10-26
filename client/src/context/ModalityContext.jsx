import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
  createModalitiesRequest,
  getModalitiesRequest,
  getAllModalitiesRequest,
  updateModalitiesRequest,  // Importa la función de actualización
  deleteModalitiesRequest
} from "../api/modality";

const ModalityContext = createContext();

export const useModality = () => {
  const context = useContext(ModalityContext);

  if (!context) {
    throw new Error("useModality must be used within a ModalityProvider");
  }
  return context;
};

export function ModalityProvider({ children }) {
  const [modalities, setModalities] = useState([]);
  const [allmodalitiesforreport, setAllModalitiesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createModality = async (modalities) => {
    const res = await createModalitiesRequest(modalities);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getModalities({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateModality = async (modality) => {
    try {
      const res = await updateModalitiesRequest(modality);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getModalities({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getModalities = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getModalitiesRequest({ search, page, limit });
      setModalities(res.data.modalities);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllModalities = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllModalitiesRequest({ search, page, limit });
      setAllModalitiesForReport(res.data.modalities);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteModality = async (id) => {
    try {
      await deleteModalitiesRequest(id);
      getModalities({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalityContext.Provider
      value={{
        modalities,
        createModality,
        updateModality,
        getModalities,
        getAllModalities,
        deleteModality,
        allmodalitiesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ModalityContext.Provider>
  );
}
