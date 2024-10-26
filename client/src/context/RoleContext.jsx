import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createRolesRequest,
    deleteRolesRequest,
    getAllRolesRequest,
    getRolesRequest,
    updateRolesRequest
} from "../api/role";

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [allrolesforreport, setAllRolesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createRole = async (roles) => {
    const res = await createRolesRequest(roles);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getRoles({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateRole = async (role) => {
    try {
      const res = await updateRolesRequest(role);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getRoles({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getRolesRequest({ search, page, limit });
      setRoles(res.data.roles);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRoles = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllRolesRequest({ search, page, limit });
      setAllRolesForReport(res.data.roles);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoles = async (id) => {
    try {
      await deleteRolesRequest(id);
      getRoles({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        createRole,
        updateRole,
        getRoles,
        getAllRoles,
        deleteRoles,
        allrolesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}
