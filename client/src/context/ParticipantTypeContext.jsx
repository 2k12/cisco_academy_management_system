import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createParticipantTypesRequest,
    deleteParticipantTypesRequest,
    getAllParticipantTypesRequest,
    getParticipantTypesRequest,
    updateParticipantTypesRequest
} from "../api/participant_type";

const ParticipantTypeContext = createContext();

export const useParticipantType = () => {
  const context = useContext(ParticipantTypeContext);

  if (!context) {
    throw new Error("useParticipantType must be used within a ParticipantTypeProvider");
  }
  return context;
};

export function ParticipantTypeProvider({ children }) {
  const [ participant_types, setParticipantTypes] = useState([]);
  const [ allparticipant_typesforreport, setAllParticipantTypesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createParticipantType = async (participant_type) => {
    const res = await createParticipantTypesRequest(participant_type);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getParticipantTypes({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateParticipantType = async (participant_type) => {
    try {
      const res = await updateParticipantTypesRequest(participant_type);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getParticipantTypes({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getParticipantTypes = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getParticipantTypesRequest({ search, page, limit });
      setParticipantTypes(res.data.participant_types);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllParticipantTypes = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllParticipantTypesRequest({ search, page, limit });
      setAllParticipantTypesForReport(res.data.participant_types);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteParticipantType = async (id) => {
    try {
      await deleteParticipantTypesRequest(id);
      getParticipantTypes({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ParticipantTypeContext.Provider
      value={{
        participant_types,
        createParticipantType,
        updateParticipantType, 
        getParticipantTypes,
        getAllParticipantTypes,
        deleteParticipantType,
        allparticipant_typesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ParticipantTypeContext.Provider>
  );
}
