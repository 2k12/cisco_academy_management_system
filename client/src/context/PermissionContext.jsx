import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
  createPermissionsRequest,
  getPermissionsRequest,
  getAllPermissionsRequest,
  updatePermissionsRequest,  // Importa la función de actualización
  deletePermissionsRequest
} from "../api/permission";

const PermissionContext = createContext();

export const usePermission = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};

export function PermissionProvider({ children }) {
  const [permissions, setPermissions] = useState([]);
  const [allpermissionsforreport, setAllPermissionsForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createPermission = async (permission) => {
    const res = await createPermissionsRequest(permission);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getPermissions({ page: currentPage }); // Obtener la lista actualizada
  };

  const updatePermission = async (permission) => {
    try {
      const res = await updatePermissionsRequest(permission);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getPermissions({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getPermissions = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getPermissionsRequest({ search, page, limit });
      setPermissions(res.data.permissions);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPermissions = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await getAllPermissionsRequest({ search, page, limit });
      setAllPermissionsForReport(res.data.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePermission = async (id) => {
    try {
      await deletePermissionsRequest(id);
      getPermissions({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        createPermission,
        updatePermission, // Añade esta línea
        getPermissions,
        getAllPermissions,
        deletePermission,
        allpermissionsforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}
