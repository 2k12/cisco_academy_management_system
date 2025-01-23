import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
  createModalitiesRequest,
  getModalitiesRequest,
  getAllModalitiesRequest,
  updateModalitiesRequest,  // Importa la función de actualización
  deleteModalitiesRequest,
  getModalitiesDropdownRequest
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

  const getModalitiesDropdown = async () => {
    try {
      const res = await getModalitiesDropdownRequest();
      setModalities(res.data.modalities);
    } catch (error) {
      console.log(error);
    }
  };

  const createModality = async (modalities) => {
    try {
      const res = await createModalitiesRequest(modalities);
      Swal.fire({ 
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      getModalities({ page: currentPage }); 
    } catch (error) {

      Swal.fire({ 
        icon: 'success',
        title: 'Éxito',
        text: error
        .response.data.message,
      });
      console.log(error);
    }

  };

  const updateModality = async (modality) => {
    try {
      const res = await updateModalitiesRequest(modality);
      Swal.fire({ 
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      getModalities({ page: currentPage }); 
    } catch (error) {
      console.log(error);
    }
  };

  const getModalities = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getModalitiesRequest({ search, page, limit });
      setModalities(res.data.modalities);
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
      const res = await deleteModalitiesRequest(id);
      Swal.fire({ 
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      getModalities({ page: currentPage }); 
    } catch (error) {
      Swal.fire({ 
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      });
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
        getModalitiesDropdown,
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
