import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createSchedulesRequest,
    deleteSchedulesRequest,
    getAllSchedulesRequest,
    getSchedulesRequest,
    updateSchedulesRequest
} from "../api/schedule";

const ScheduleContext = createContext();

export const useSchedule = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState([]);
  const [allschedulesforreport, setAllSchedulesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createSchedule = async (schedule) => {
    const res = await createSchedulesRequest(schedule);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getSchedules({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateSchedule = async (schedule) => {
    try {
      const res = await updateSchedulesRequest(schedule);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getSchedules({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getSchedules = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getSchedulesRequest({ search, page, limit });
      setSchedules(res.data.schedules);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSchedules = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllSchedulesRequest({ search, page, limit });
      setAllSchedulesForReport(res.data.schedules);
    } catch (error) {
      console.log(error);
    }                   
  };

  const deleteSchedule = async (id) => {
    try {
      await deleteSchedulesRequest(id);
      getSchedules({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        createSchedule,
        updateSchedule, // Añade esta línea
        getSchedules,
        getAllSchedules,
        deleteSchedule,
        allschedulesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
