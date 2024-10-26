// import React from "react";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
import { useModality } from "../../context/ModalityContext";



function ReportsModal({ isOpen, onClose }) {
    const { getAllModalities, allmodalitiesforreport } = useModality();
    if (!isOpen) return null;

    const handleGeneratePDF = () => {
        getAllModalities({ search: "", page: 1 });
        console.log(allmodalitiesforreport);
        const pdf = new jsPDF();
        pdf.text("Reporte de Modalidades", 10, 10);
    
        // Encabezados
        pdf.setFont("helvetica", "bold");
        pdf.text("ID", 10, 20);
        pdf.text("Nombre", 40, 20);
        pdf.text("Descripción", 100, 20);
        pdf.setFont("helvetica", "normal");
    
        // Datos
        allmodalitiesforreport.forEach((mod, index) => {
          pdf.text(`${mod.modality_id}`, 10, 30 + index * 10);
          pdf.text(`${mod.name}`, 40, 30 + index * 10);
          pdf.text(`${mod.description}`, 100, 30 + index * 10);
        });
    
        pdf.save("reporte.modalities.pdf");
        // setGenerateType(null); // Restablecer el tipo de generación
        onClose(); // Cierra el modal después de generar el reporte
    
    };

    const handleGenerateExcel = () => {
        // const table = document.getElementById("table-to-excel");
        // const wb = XLSX.utils.table_to_book(table, { sheet: "Hoja1" });
        // XLSX.writeFile(wb, "reporte.xlsx");
        // onClose(); // Cierra el modal después de generar el reporte
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl mb-4 text-white">Generar Reporte</h2>
                <button onClick={onClose} className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2">X</button>
                <div className="flex justify-between">
                    <button
                        onClick={handleGeneratePDF}
                        className="bg-indigo-500 px-4 py-2 text-white rounded-md"
                    >
                        Generar PDF
                    </button>
                    <button
                        onClick={handleGenerateExcel}
                        className="bg-green-500 px-4 py-2 text-white rounded-md"
                    >
                        Generar Excel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportsModal;
