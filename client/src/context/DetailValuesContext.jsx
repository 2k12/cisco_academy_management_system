import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createDetailValuesRequest,
    deleteDetailValuesRequest,
    getAllDetailValuesRequest,
    getDetailValuesRequest,
    updateDetailValuesRequest
} from "../api/detail_values";

const DetailValuesContext = createContext();

export const useDetailValues = () => {
  const context = useContext(DetailValuesContext);

  if (!context) {
    throw new Error("useDetailValues must be used within a DetailValuesProvider");
  }
  return context;
};

export function DetailValuesProvider({ children }) {
  const [detailvalues, setDetailValues] = useState([]);
  const [alldetailvaluesforreport, setAllDetailValuesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createDetailValue = async (detail_value) => {
    const res = await createDetailValuesRequest(detail_value);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getDetailValues({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateDetailValue = async (detail_value) => {
    try {
      const res = await updateDetailValuesRequest(detail_value);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getDetailValues({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailValues = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getDetailValuesRequest({ search, page, limit });
      setDetailValues(res.data.detail_values);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDetailValues = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllDetailValuesRequest({ search, page, limit });
      setAllDetailValuesForReport(res.data.detail_values);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDetailValues = async (id) => {
    try {
      await deleteDetailValuesRequest(id);
      getDetailValues({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DetailValuesContext.Provider
      value={{
        detailvalues,
        createDetailValue,
        updateDetailValue,
        getDetailValues,
        getAllDetailValues,
        deleteDetailValues,
        alldetailvaluesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </DetailValuesContext.Provider>
  );
}
