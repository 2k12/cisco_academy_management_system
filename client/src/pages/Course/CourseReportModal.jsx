import { useState } from "react";
import { jsPDF } from "jspdf";

function CourseReportModal({ isOpen, onClose, course }) {


    const [participantCounts, setParticipantCounts] = useState({
        participants10: 10,
        participants15: 15,
        participants20: 20,
    });

    const [previewData, setPreviewData] = useState([]);


    // Mover la condición aquí evita el problema
    if (!isOpen) {
        return null;
    }

    const calculateEstimation = () => {
        const instructorValue = 624;
        const rows = [
            { participants: participantCounts.participants10, cost: 60 },
            { participants: participantCounts.participants15, cost: 60 },
            { participants: participantCounts.participants20, cost: 60 },
        ];


        rows.forEach(row => {

            const auxValue = (row.cost * row.participants) - instructorValue;


            row.totalRevenue = auxValue;
            row.remainingBalance = row.totalRevenue;
            row.operationalCost = row.remainingBalance * 0.10;
            row.universityBalance = row.operationalCost;
            row.ciscoPayment = row.remainingBalance - row.operationalCost;

        });

        setPreviewData(rows);
    };

    const handleGeneratePDF = () => {
        const pdf = new jsPDF();


        console.log(course);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        const cellPadding = 2;
        const tableCellHeight = 10;
        const margin = 5;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text(`Anexo1. Resumen del curso ${course.course_name}`, pdf.internal.pageSize.width / 2, 15, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);

        const detail = course.Detail || {};
        const courseDetails = [
            { label: "Nombre del curso", value: course.course_name || "" },
            { label: "Descripción", value: detail.course_description || "" },
            { label: "Horas totales", value: detail.total_hours || "" },
            { label: "Costo", value: detail.cost ? `$${detail.cost}` : "" },
            { label: "Fecha de inicio", value: course.start_date || "" },
            // { label: "Fecha de finalización", value: course.end_date || "" },
            { label: "Modalidad", value: "" },
            { label: "Horarios", value: course.schedule || "" },
            { label: "Instructor/ra", value: course.Detail.Instructor.name || "" },
            { label: "Duración curso (horas)", value: detail.total_hours || "" },
            { label: "Total horas dictadas por el instructor", value: detail.instructor_hours || "" },
            { label: "Horas de actividades", value: detail.activities_hours || "" },
            { label: "Costo hora clase, incluido IVA", value: detail.cost_per_hour || "" },
            { label: "Costo curso UTN (IVA incluido)", value: detail.cost_utn || "" },
            { label: "Costo curso Particulares (IVA Incluido)", value: detail.cost_general || "" },
            { label: "Número aprobados", value: detail.num_registered || "" },
            { label: "Número matriculados", value: detail.num_enrolled || "" },
            { label: "Número retirados/no aprobados", value: detail.num_failed || "" },
            // { label: "Total recaudado a la fecha incluido IVA", value: detail.total_revenue_iva || "" },
            { label: "Total recaudado a la fecha incluido IVA", value: detail.DetailValue.total_amount || "" },
            { label: "Pago Instructor incluido IVA", value: (detail.instructor_hours * parseFloat(detail.cost_per_hour)) || "" },
            { label: "Saldo a favor incluido IVA", value: (detail.DetailValue.total_amount - (detail.instructor_hours * parseFloat(detail.cost_per_hour))) || "" }
        ];

        let yPosition = 25;
        const tableCellWidth = (pdf.internal.pageSize.width - 20) / 2;

        courseDetails.forEach((item) => {
            const labelText = item.label ? item.label + ":" : "";
            const valueText = item.value ? item.value.toString() : "";

            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.1);
            pdf.rect(margin + 5, yPosition, tableCellWidth, tableCellHeight);
            pdf.text(labelText, margin + 5 + cellPadding, yPosition + tableCellHeight / 2 + 1.5);

            pdf.rect(margin + 5 + tableCellWidth, yPosition, tableCellWidth, tableCellHeight);
            pdf.text(valueText, margin + 5 + tableCellWidth + cellPadding, yPosition + tableCellHeight / 2 + 1.5);

            yPosition += tableCellHeight;
        });

        // Page 2: Participants List
        pdf.addPage();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text("Anexo 2. Reporte de Matriculados", pdf.internal.pageSize.width / 2, 15, { align: "center" });

        // Table headers
        const headers = ["N°", "Cédula", "Nombre", "Teléfono", "Ciudad", "Tipo", "Facultad", "Carrera UTN", "Institución", "Valor Recaudado"];
        let xPosition = margin;
        yPosition = 25;
        pdf.setFontSize(7); // Smaller font size for the table

        headers.forEach((header, index) => {
            const columnWidth = index === 0 ? 10 : index === 7 ? 30 : index === 5 || index === 6 ? 17 : index === 9 ? 24 : 20;
            pdf.setFont("helvetica", "bold");
            pdf.rect(xPosition, yPosition, columnWidth, tableCellHeight);
            pdf.text(header, xPosition + cellPadding, yPosition + tableCellHeight / 2 + 1.5);

            xPosition += columnWidth;
        });

        yPosition += tableCellHeight;

        // Participant data
        pdf.setFont("helvetica", "normal"); // Non-bold font for participant rows
        let totalRevenue = 0;
        const rowHeight = tableCellHeight; // Set a fixed row height

        course.Participants.forEach((participant, index) => {
            xPosition = margin;

            const participantType = participant.ParticipantType ? participant.ParticipantType.name : "";
            const faculty = participant.InfoUtns && participant.InfoUtns[0] ? participant.InfoUtns[0].faculty : "";
            const degree = participant.InfoUtns && participant.InfoUtns[0] ? participant.InfoUtns[0].degree : "";

            const participantData = [
                (index + 1).toString(),
                `${participant.cid}` || "",
                participant.name || "",
                participant.phone || "",
                participant.address || "",
                participantType || "",
                faculty || "",
                degree || "",
                participant.institution || "",
                `${participant.total_payment} USD` || "0.00 USD"
            ];

            totalRevenue += parseFloat(participant.total_payment) || 0;

            participantData.forEach((data, idx) => {
                const cellWidth = idx === 0 ? 10 : idx === 7 ? 30 : idx === 5 || idx === 6 ? 17 : idx === 9 ? 24 : 20;

                pdf.rect(xPosition, yPosition, cellWidth, rowHeight); // Use fixed row height
                const cellContent = pdf.splitTextToSize(data, cellWidth - cellPadding * 2);
                cellContent.forEach((line, lineIndex) => {
                    pdf.text(line, xPosition + cellPadding, (yPosition) + rowHeight / 3 + lineIndex * 2);
                });

                xPosition += cellWidth;
            });

            yPosition += rowHeight; // Increment by fixed row height after each row
        });

        yPosition += 10; // Deja un espacio antes del total
        pdf.setFont("helvetica", "bold");

        // Calcula la posición x para la etiqueta y el valor total
        const totalLabelXPosition = margin + 145;
        const totalValueXPosition = margin + 175; // Ajusta según el ancho acumulado de las columnas previas

        // Agrega el texto del total
        pdf.text("Total Valor Recaudado:", totalLabelXPosition, yPosition);
        pdf.text(`${totalRevenue.toFixed(2)} USD`, totalValueXPosition, yPosition);

        pdf.save("reporte_curso.pdf");
        onClose();
    };

    const handleGenerateEstimationTablePDF = () => {
        const pdf = new jsPDF();
        const margin = 30;
        const cellPadding = 2;
        const lineHeight = 4.5;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);

        let instructorValue = 624;
        const rows = [
            { participants: participantCounts.participants10, cost: 60 },
            { participants: participantCounts.participants15, cost: 60 },
            { participants: participantCounts.participants20, cost: 60 }
        ];


        rows.forEach(row => {

            let valueforConceptTotal = (row.cost * row.participants);
            const auxValue =  valueforConceptTotal- instructorValue;

            row.valueforConceptTotal = valueforConceptTotal;
            row.totalRevenue = auxValue;
            row.remainingBalance = row.totalRevenue < 0 ? 0 : row.totalRevenue ;
            row.operationalCost = row.remainingBalance * 0.10;
            row.universityBalance = row.operationalCost;
            row.ciscoPayment = row.remainingBalance - row.operationalCost;

        });

        setPreviewData(rows);

        pdf.setFont("helvetica", "bold");
        pdf.text("Estimación de Costos del Curso", pdf.internal.pageSize.width / 2, 15, { align: "center" });

        const headers = [
            "Concepto",
            `${participantCounts.participants10} Participantes`,
            `${participantCounts.participants15} Participantes`,
            `${participantCounts.participants20} Participantes`
        ];

        const data = [
            ["Número Participantes",
                `${participantCounts.participants10}`,
                `${participantCounts.participants15}`,
                `${participantCounts.participants20}`],
            ["Costo Mínimo del Curso", `$${rows[0].cost.toFixed(2)}`, `$${rows[1].cost.toFixed(2)}`, `$${rows[2].cost.toFixed(2)}`],
            ["Total Ingresos", `$${rows[0].valueforConceptTotal.toFixed(2)}`, `$${rows[1].valueforConceptTotal.toFixed(2)}`, `$${rows[2].valueforConceptTotal.toFixed(2)}`],
            ["Número Horas Instructor", `${course.Detail.instructor_hours}`, `${course.Detail.instructor_hours}`, `${course.Detail.instructor_hours}`],
            ["Costo Hora Instructor", `$${course.Detail.cost_per_hour}`, `$${course.Detail.cost_per_hour}`, `${course.Detail.cost_per_hour}`],
            ["Total Instructor", `$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`,`$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`, `$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`],
            ["Coordinación Académica", "$0.00", "$0.00", "$0.00"],
            ["Computadoras lab. FICA", "$0.00", "$0.00", "$0.00"],
            ["Internet Lab. FICA", "$0.00", "$0.00", "$0.00"],
            ["Material Didáctico Lab. FICA", "$0.00", "$0.00", "$0.00"],
            ["Capacitación Instructores", "$0.00", "$0.00", "$0.00"],
            ["Inscripciones, Publicidad en Redes Sociales, Radio y TV-UTN", "$0.00", "$0.00", "$0.00"],
            ["Total Egresos", `$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`,`$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`, `$${(course.Detail.instructor_hours * parseFloat(course.Detail.cost_per_hour))}`],
            // ["Total Egresos", "$624.00", "$624.00", "$624.00"],
            // ["Total Egresos", `$${rows[0].totalExpenses.toFixed(2)}`, `$${rows[1].totalExpenses.toFixed(2)}`, `$${rows[2].totalExpenses.toFixed(2)}`],
            ["Saldo a Favor", `$${rows[0].remainingBalance.toFixed(2)}`, `$${rows[1].remainingBalance.toFixed(2)}`, `$${rows[2].remainingBalance.toFixed(2)}`],
            ["Costo Operacional (10%)", `$${rows[0].operationalCost.toFixed(2)}`, `$${rows[1].operationalCost.toFixed(2)}`, `$${rows[2].operationalCost.toFixed(2)}`],
            ["Saldo a Favor Academia CISCO", `$${rows[0].ciscoPayment.toFixed(2)}`, `$${rows[1].ciscoPayment.toFixed(2)}`, `$${rows[2].ciscoPayment.toFixed(2)}`]
        ];

        const colWidths = [60, 30, 30, 30];
        let startY = 25;
        const defaultCellHeight = 10;

        // Dibujar encabezados con bordes
        pdf.setFont("helvetica", "normal");
        let xPosition = margin;

        headers.forEach((header, i) => {
            pdf.rect(xPosition, startY, colWidths[i], defaultCellHeight); // Dibuja borde de celda
            pdf.text(header, xPosition + cellPadding, startY + defaultCellHeight / 2 + 2); // Texto dentro de la celda
            xPosition += colWidths[i];
        });

        startY += defaultCellHeight;

        // Colores de fondo para las filas
        const rowColors = [
            [0, 240, 255], // celeste
            [0, 240, 255], // celeste
            [255, 255, 0],   // amarillo
            [173, 216, 230], // celeste super bajito
            [173, 216, 230],
            [173, 216, 230],
            [173, 216, 230],
            [255, 192, 203], // color bajito
            [255, 192, 203],
            [255, 192, 203],
            [255, 192, 203],
            [0, 128, 0],     // verde
            [255, 0, 0],     // rojo normal
            [128, 0, 128],   // morado bajito
            [128, 0, 128],
            [128, 0, 128]
        ];

        // Dibujar filas con datos y bordes
        data.forEach((row, index) => {
            xPosition = margin;

            // Determina la altura de la fila basado en el contenido más alto de cada celda
            const rowHeight = Math.max(...row.map(cell => {
                const cellLines = pdf.splitTextToSize(cell, colWidths[0] - 2 * cellPadding);
                return cellLines.length * lineHeight + cellPadding;
            }));

            // Establecer el color de fondo
            const bgColor = rowColors[index] || [255, 255, 255]; // blanco si no hay color especificado
            pdf.setFillColor(...bgColor);
            pdf.rect(margin, startY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F'); // Dibuja el fondo de la fila

            // Dibujar cada columna de la fila
            row.forEach((cell, colIndex) => {
                const cellWidth = colWidths[colIndex];

                // Dibuja el borde de la celda
                pdf.rect(xPosition, startY, cellWidth, rowHeight);

                // Ajuste de texto en varias líneas para celdas largas
                const cellLines = pdf.splitTextToSize(cell, cellWidth - 2 * cellPadding);
                cellLines.forEach((line, lineIndex) => {
                    pdf.text(line, xPosition + cellPadding, startY + 3 + lineIndex * lineHeight + cellPadding);
                });

                xPosition += cellWidth;
            });

            startY += rowHeight;
        });

        pdf.save("estimacion_curso.pdf");
        onClose();
    };




    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl mb-4 text-white">Descargar Documentos</h2>
                <button onClick={onClose} className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2">X</button>
                <div className="space-y-4">
                    <div>
                        <label className="block text-white">V1-Participantes:</label>
                        <input
                            type="number"
                            className="w-full p-2 rounded-md text-black"
                            value={participantCounts.participants10}
                            onChange={e => setParticipantCounts({ ...participantCounts, participants10: +e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-white">V2-Participantes:</label>
                        <input
                            type="number"
                            className="w-full p-2 rounded-md text-black"
                            value={participantCounts.participants15}
                            onChange={e => setParticipantCounts({ ...participantCounts, participants15: +e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-white">V3-Participantes:</label>
                        <input
                            type="number"
                            className="w-full p-2 rounded-md text-black"
                            value={participantCounts.participants20}
                            onChange={e => setParticipantCounts({ ...participantCounts, participants20: +e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <button
                        onClick={calculateEstimation}
                        className="bg-green-500 px-4 py-2 text-white rounded-md w-full"
                    >
                        Calcular Estimación
                    </button>
                </div>

                <div className="mt-2 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Previsualización</h3>
                    {previewData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-left text-gray-800 border-collapse">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="py-2 px-1 text-sm font-semibold text-gray-600">Concepto</th>
                                        <th className="py-2 px-1 text-sm font-semibold text-gray-600">${participantCounts.participants10} P.</th>
                                        <th className="py-2 px-1 text-sm font-semibold text-gray-600">${participantCounts.participants15} P.</th>
                                        <th className="py-2 px-1 text-sm font-semibold text-gray-600">${participantCounts.participants20} P.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-2 px-1 text-sm">Total Ingresos</td>
                                        <td className="py-2 px-1 text-sm">${previewData[0].remainingBalance.toFixed(2) < 0 ? 0 : previewData[0].remainingBalance.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[1].remainingBalance.toFixed(2) < 0 ? 0 : previewData[1].remainingBalance.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[2].remainingBalance.toFixed(2) < 0 ? 0 : previewData[2].remainingBalance.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-2 px-1 text-sm">Costo Operacional (10%)</td>
                                        <td className="py-2 px-1 text-sm">${previewData[0].operationalCost.toFixed(2) < 0 ? 0 : previewData[0].operationalCost.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[1].operationalCost.toFixed(2) < 0 ? 0 : previewData[1].operationalCost.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[2].operationalCost.toFixed(2) < 0 ? 0 : previewData[2].operationalCost.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-2 px-1 text-sm">Saldo a Favor CISCO</td>
                                        <td className="py-2 px-1 text-sm">${previewData[0].ciscoPayment.toFixed(2) < 0 ? 0 : previewData[0].ciscoPayment.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[1].ciscoPayment.toFixed(2) < 0 ? 0 : previewData[1].ciscoPayment.toFixed(2)}</td>
                                        <td className="py-2 px-1 text-sm">${previewData[2].ciscoPayment.toFixed(2) < 0 ? 0 : previewData[2].ciscoPayment.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No hay datos disponibles para previsualizar.</p>
                    )}
                </div>

                <div className="flex justify-between mt-2">
                    <button
                        onClick={handleGeneratePDF}
                        className="dark:hover:bg-orange-500 bg-orange-500 px-4 py-2 text-white rounded-md w-full"
                    >
                        {"Generar Anexos (PDF)"}
                    </button>
                </div>



                <div className="flex justify-between mt-2 ">

                    <button
                        onClick={handleGenerateEstimationTablePDF}
                        className="dark:hover:bg-blue-500 bg-blue-500 px-4 py-2 text-white rounded-md w-full"
                    >
                        {"Generar Tabla de Estimación (PDF)"}
                    </button>
                </div>



                {/* </div> */}
            </div>
        </div>
    );
}

export default CourseReportModal;
