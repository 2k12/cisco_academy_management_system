import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
  createChaptersRequest,
  deleteChaptersRequest,
  getAllChaptersRequest,
  getChaptersRequest,
  updateChaptersRequest
} from "../api/chapter";

const ChapterContext = createContext();

export const useChapter = () => {
  const context = useContext(ChapterContext);

  if (!context) {
    throw new Error("useRChapters must be used within a ChapterProvider");
  }
  return context;
};

export function ChapterProvider({ children }) {
  const [chapters, setChapters] = useState([]);
  const [allchaptersforreport, setAllChaptersForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createChapter = async (chapter) => {
    try {
      const res = await createChaptersRequest(chapter);
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getChapters({ page: currentPage }); // Obtener la lista actualizada      
    } catch (error) {
      console.log(error);
    }

  };

  const updateChapter = async (chapter) => {
    try {
      const res = await updateChaptersRequest(chapter);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getChapters({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getChapters = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getChaptersRequest({ search, page, limit });
      setChapters(res.data.chapters);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChapters = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllChaptersRequest({ search, page, limit });
      setAllChaptersForReport(res.data.chapters);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChapters = async (id) => {
    try {
      await deleteChaptersRequest(id);
      getChapters({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChapterContext.Provider
      value={{
        chapters,
        createChapter,
        updateChapter,
        getChapters,
        getAllChapters,
        deleteChapters,
        allchaptersforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
}
