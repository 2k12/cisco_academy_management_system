import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCourse } from "../../context/CourseContext";
import { getAllParticipantsRequest } from "../../api/participant";

function ParticipantReportsModal({ isOpen, onClose }) {
    const { getCoursesDropdown, courses } = useCourse();
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        if (isOpen) {
            getCoursesDropdown();
        }
    }, [isOpen]);

    const handleGeneratePDF = async () => {
        if (!selectedCourse) {
            alert("Por favor selecciona un curso");
            return;
        }

        try {
            const response = await getAllParticipantsRequest({
                search: "",
                limit: 1000,
                page: 1,
                courseName: selectedCourse,
            });

            const participantes = response.data.participants;

            if (!participantes || participantes.length === 0) {
                alert("No se encontraron participantes para este curso");
                return;
            }

            const pdf = new jsPDF();

            // Título del reporte
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(18);
            pdf.text(`Reporte de Participantes Curso ${selectedCourse}`, pdf.internal.pageSize.getWidth() / 2, 15, { align: "center" });

            // Tabla con `autoTable`
            const tableData = participantes.map((participant) => [
                participant.participant_id,
                participant.name,
                participant.phone,
                participant.address,
            ]);

            autoTable(pdf, {
                startY: 25,
                head: [["ID", "Nombre", "Teléfono", "Dirección"]],
                body: tableData,
                styles: {
                    font: "helvetica",
                    fontSize: 10,
                    cellPadding: 3,
                },
                columnStyles: {
                    0: { cellWidth: 20 }, // ID
                    1: { cellWidth: 50 }, // Nombre
                    2: { cellWidth: 50 }, // Teléfono
                    3: { cellWidth: 60 }, // Dirección
                },
                headStyles: {
                    fillColor: [30, 144, 255], // Azul para la cabecera
                    textColor: 255, // Blanco
                    fontStyle: "bold",
                },
                bodyStyles: {
                    textColor: 50,
                    lineWidth: 0.1,
                    lineColor: [200, 200, 200],
                },
                theme: "grid",
                didDrawCell: (data) => {
                    // Manejar contenido largo automáticamente
                    const text = data.cell.raw || "";
                    const lines = pdf.splitTextToSize(text, data.cell.styles.cellWidth);
                    data.cell.text = lines;
                },
            });

            // Guardar el PDF
            pdf.save(`reporte_participantes_${selectedCourse}.pdf`);
            onClose();
        } catch (error) {
            console.error("Error al generar el reporte:", error);
            alert("Error al generar el reporte.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2"
                >
                    X
                </button>
                <h2 className="text-xl mb-4 text-white">Generar Reporte Participantes</h2>
                <div className="mb-4">
                    <label className="text-white">Selecciona un curso:</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full mt-2 p-2 rounded bg-gray-700 text-white"
                    >
                        <option value="">Seleccione...</option>
                        {courses.map((course) => (
                            <option key={course.course_id} value={course.course_name}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button onClick={handleGeneratePDF} className="bg-indigo-500 px-4 py-2 text-white rounded-md">
                        Generar PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ParticipantReportsModal;
