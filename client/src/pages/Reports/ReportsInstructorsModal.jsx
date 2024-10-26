// import React from "react";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
import { useInstructor } from "../../context/InstructorContext";



function ReportsModal({ isOpen, onClose }) {
    const { getAllInstructors, allinstructorsforreport } = useInstructor();
    if (!isOpen) return null;

    console.log("↓↓");
    console.log(allinstructorsforreport);

    // const handleGeneratePDF = () => {
    //     getAllInstructors({ search: "", page: 1 });
    //     const pdf = new jsPDF();

    //     // Título del reporte
    //     pdf.text("Reporte de Instructores", 10, 10);

    //     // Encabezados de la tabla
    //     pdf.setFont("helvetica", "bold");
    //     pdf.text("ID", 10, 20);             // Columna ID
    //     pdf.text("Identificación", 30, 20);  // Columna Identificación
    //     // pdf.text("Nombre", 70, 20);          // Columna Nombre
    //     // pdf.text("Teléfono", 110, 20);       // Columna Teléfono
    //     // pdf.text("Email", 150, 20);          // Columna Email
    //     // pdf.text("RUC", 190, 20);            // Columna RUC
    //     // pdf.text("Certificado Bancario", 230, 20); // Columna Certificado

    //     pdf.setFont("helvetica", "normal");

    //     // // Datos de cada instructor
    //     allinstructorsforreport.forEach((instructor, index) => {
    //         const yPos = 30 + index * 10;  // Ajustar Y para cada fila
    //         pdf.text(`${instructor.instructor_id}`, 10, yPos);
    //         pdf.text(`${instructor.identification_number}`, 30, yPos);
    //         // pdf.text(`${instructor.name}`, 70, yPos);
    //         // pdf.text(`${instructor.phone}`, 110, yPos);
    //         // pdf.text(`${instructor.email}`, 150, yPos);
    //         // pdf.text(`${instructor.ruc_number}`, 190, yPos);
    //         // pdf.text(`${instructor.banck_certificate_url}`, 230, yPos);
    //     });

    //     pdf.save("reporte_instructores.pdf");
    //     onClose();
    // };

    const handleGeneratePDF = () => {
        getAllInstructors({ search: "", page: 1 });
        const pdf = new jsPDF();

        // Título del reporte
          pdf.setFontSize(14);
        pdf.text("Reporte de Instructores", 10, 10);

        // Estilo de texto más pequeño
        pdf.setFontSize(10);
        let startY = 20; // Posición inicial para los datos

        allinstructorsforreport.forEach((instructor, index) => {
            const rowY = startY + index * 20; // Aumenta la distancia entre cada entrada
            pdf.text(`Instructor ${index + 1}:`, 10, rowY); // Título para cada instructor
            pdf.text(`ID: ${instructor.instructor_id}`, 10, rowY + 5);
            pdf.text(`Identificación: ${instructor.identification_number}`, 10, rowY + 10);
            pdf.text(`Nombre: ${instructor.name}`, 10, rowY + 15);
            pdf.text(`Teléfono: ${instructor.phone}`, 80, rowY + 5);
            pdf.text(`Email: ${instructor.email}`, 80, rowY + 10);
            pdf.text(`RUC: ${instructor.ruc_number}`, 80, rowY + 15);
            pdf.text(`Certificado Bancario: ${instructor.banck_certificate_url}`, 10, rowY + 20);
        });

        pdf.save("reporte_instructores.pdf");
        onClose();
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
