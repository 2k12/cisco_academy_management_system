import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useInstructor } from "../../context/InstructorContext";
import RegisterInstructorModal from "./RegisterInstructorModal";
import ReportsInstructorsModal from "../Reports/ReportsInstructorsModal";

function PermissionPage() {
  const { getInstructors, instructors, totalPages, currentPage, setCurrentPage } = useInstructor();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);


  useEffect(() => {
    getInstructors({ search: searchTerm, page: currentPage });
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

  const handleEdit = (instructor) => {
    setSelectedInstructor(instructor);
    setIsRegisterModalOpen(true);
  };
  console.log("--------")
  console.log(instructors);
  console.log("--------")


  return (
    <div className="p-6 bg-zinc-750 min-h-screen text-white overflow-hidden">
      <div className="flex justify-between mb-6">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar Instructor..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2 rounded-lg  text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 "
          >
            Registrar Instructor
          </button>
          <button
            onClick={() => setIsReportsModalOpen(true)}
            className=" px-4 py-2 rounded-lg  text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 "
          >
            Reportes
          </button>
        </div>
      </div>

      {/* Tabla de permisos con formato actualizado */}
      <div className=" scroll-hidden dark:bg-gray-800 relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] min-h-[600px] ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Identificación</th>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Celular</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">RUC</th>
              <th scope="col" className="px-6 py-3">Certificado Bancario Url</th>
              {/* <th scope="col" className="px-6 py-3 text-red-500">DETAIL TEST</th> */}
              <th scope="col" className="px-6 py-3">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.instructor_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {instructor.instructor_id}
                </th>
                <td className="px-6 py-4">{instructor.identification_number}</td>
                <td className="px-6 py-4">{instructor.name}</td>
                <td className="px-6 py-4">{instructor.phone}</td>
                <td className="px-6 py-4">{instructor.email}</td>
                <td className="px-6 py-4">{instructor.ruc_number}</td>
                <td className="px-6 py-4">{instructor.banck_certificate_url}</td>
                {/* <td className="px-6 py-4">{instructor.Details[0]?.detail_id}</td> */}
                <td className="px-6 py-4 flex space-x-2">
                  <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(instructor)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 mr-2 ml-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
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

      {/* Modales */}
      <RegisterInstructorModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} instructor={selectedInstructor} />
      <ReportsInstructorsModal isOpen={isReportsModalOpen} onClose={() => setIsReportsModalOpen(false)} />
    </div>
  );
}

export default PermissionPage;
