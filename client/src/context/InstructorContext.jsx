import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
  getInstructorsDropdownRequest,
  getAllInstructorsRequest,
  createInstructorsRequest,
  getInstructorsRequest,
  //   deleteInstructorsRequest,
  updateInstructorsRequest
} from "../api/instructor";

const InstructorContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInstructor = () => {
  const context = useContext(InstructorContext);

  if (!context) {
    throw new Error("useInstructor must be used within a InstructorProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function InstructorProvider({ children }) {
  const [instructors, setInstructors] = useState([]);
  const [allinstructorsforreport, setAllInstructorsForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createInstructor = async (instructor) => {
    try {
      const res = await createInstructorsRequest(instructor);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      getInstructors({ page: currentPage });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ha ocurrido un error',
      });
      console.log(error);
    }
  };

  const updateInstructor = async (instructor) => {
    try {
      const res = await updateInstructorsRequest(instructor);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      getInstructors({ page: currentPage });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ha ocurrido un error',
      });
      console.log(error);
    }
  };

  const getInstructors = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getInstructorsRequest({ search, page, limit });
      setInstructors(res.data.instructors);
      //   console.log(res.data.instructors);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInstructors = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllInstructorsRequest({ search, page, limit });
      setAllInstructorsForReport(res.data.instructors);
      //   setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstructorsDropdown = async () => {
    try {
      const res = await getInstructorsDropdownRequest();
      setInstructors(res.data.instructors);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <InstructorContext.Provider
      value={{
        instructors,
        createInstructor,
        updateInstructor,
        getInstructors,
        getAllInstructors,
        allinstructorsforreport,
        totalPages,
        currentPage,
        setCurrentPage,
        getInstructorsDropdown
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
