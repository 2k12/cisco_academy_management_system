import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRole } from "../../context/RoleContext";
import RegisterRoleModal from "../Role/RegisterRoleModal";
import ReportsModalityModal from "../Reports/ReportsModalityModal";

function RolePage() {
  const { getRoles, roles , totalPages, currentPage, setCurrentPage, deleteRoles } = useRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    getRoles({ search: searchTerm, page: currentPage });
  }, [searchTerm, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsRegisterModalOpen(true);
  };

  const handleDelete = (roleId) => {
    deleteRoles(roleId); // Llama a la función de eliminación
  };

  return (
    <div className="p-6 bg-zinc-750 min-h-screen text-white overflow-hidden">
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Buscar roles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setSelectedRole(null);
              setIsRegisterModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            Registrar Rol
          </button>
          <button
            onClick={() => setIsReportsModalOpen(true)}
            className="px-4 py-2 rounded-lg text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            Reportes
          </button>
        </div>
      </div>

      <div className="scroll-hidden dark:bg-gray-800 relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] min-h-[600px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Descripción</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.role_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {role.role_id}
                </th>
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">{role.status}</td>
                <td className="px-6 py-4 flex space-x-4"> {/* Cambié space-x-2 por space-x-4 */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(role)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(role.role_id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg bg-gray-600 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-500'}`}
        >
          Anterior
        </button>
        <span className="text-lg">Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg bg-gray-600 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-500'}`}
        >
          Siguiente
        </button>
      </div>

      <RegisterRoleModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} role={selectedRole} />
      <ReportsModalityModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
    </div>
  );
}

export default RolePage;
