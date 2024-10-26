import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert
import {
    createCertificatesRequest,
    deleteCertificatesRequest,
    getCertificatesRequest,
    updateCertificatesRequest
} from "../api/certificate";

const CertificateContext = createContext();

export const useCertificate = () => {
  const context = useContext(CertificateContext);

  if (!context) {
    throw new Error("useCertificate must be used within a CertificateProvider");
  }
  return context;
};

export function CertificateProvider({ children }) {
  const [certificates, setCertificates] = useState([]);
  const [allcertificatesforreport, setAllCertificatesForReport] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const createCertificate = async (certificate) => {
    const res = await createCertificatesRequest(certificate);
    console.log(res);
    // Aquí puedes actualizar el estado si lo deseas
    getCertificates({ page: currentPage }); // Obtener la lista actualizada
  };

  const updateCertificate = async (certificate) => {
    try {
      const res = await updateCertificatesRequest(certificate);
      Swal.fire({ // Muestra el mensaje de éxito
        icon: 'success',
        title: 'Éxito',
        text: res.data.message,
      });
      console.log(res);
      // Aquí puedes actualizar el estado si lo deseas
      getCertificates({ page: currentPage }); // Obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  const getCertificates = async ({ search = '', page = 1, limit = 15 }) => {
    try {
      const res = await getCertificatesRequest({ search, page, limit });
      setCertificates(res.data.certificates);
      // console.log(res.data.permissions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCertificates = async ({ search = '', page = 1, limit = 1000 }) => {
    try {
      const res = await createCertificatesRequest({ search, page, limit });
      setAllCertificatesForReport(res.data.certificates);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCertificates = async (id) => {
    try {
      await deleteCertificatesRequest(id);
      getCertificates({ page: currentPage }); // Vuelve a obtener la lista actualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        createCertificate,
        updateCertificate,
        getCertificates,
        getAllCertificates,
        deleteCertificates,
        allcertificatesforreport,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}
