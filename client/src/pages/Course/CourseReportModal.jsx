import { jsPDF } from "jspdf";

function CourseReportModal({ isOpen, onClose, course }) {
    if (!isOpen) return null;

    const handleGeneratePDF = () => {
        const pdf = new jsPDF();

        // General configurations
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        const cellPadding = 2;
        const tableCellHeight = 10;
        const margin = 5;

        // Page 1: Course Details
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text(`Anexo1. Resumen del curso de ${course.course_name}`, pdf.internal.pageSize.width / 2, 15, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);

        const detail = course.Detail || {};
        const courseDetails = [
            { label: "Nombre del curso", value: course.course_name || "" },
            { label: "Descripción", value: detail.course_description || "" },
            { label: "Horas totales", value: detail.total_hours || "" },
            { label: "Costo", value: detail.cost ? `$${detail.cost}` : "" },
            { label: "Fecha de inicio", value: course.start_date || "" },
            { label: "Fecha de finalización", value: course.end_date || "" },
            { label: "Modalidad", value: course.status || "" },
            { label: "Horarios", value: course.schedule || "" },
            { label: "Instructora", value: course.instructor || "" },
            { label: "Duración curso (horas)", value: detail.duration_hours || "" },
            { label: "Total horas dictadas por el instructor", value: detail.instructor_hours || "" },
            { label: "Horas de actividades", value: detail.activity_hours || "" },
            { label: "Costo hora clase, incluido IVA", value: detail.hourly_rate_iva || "" },
            { label: "Costo curso UTN (IVA incluido)", value: detail.cost_utn || "" },
            { label: "Costo curso Particulares (IVA Incluido)", value: detail.cost_general || "" },
            { label: "Número matriculados", value: detail.enrolled_count || "" },
            { label: "Número aprobados", value: detail.approved_count || "" },
            { label: "Número retirados/no aprobados", value: detail.not_approved_count || "" },
            { label: "Total recaudado a la fecha incluido IVA", value: detail.total_revenue_iva || "" },
            { label: "Pago Instructor incluido IVA", value: detail.instructor_payment_iva || "" },
            { label: "Saldo a favor incluido IVA", value: detail.remaining_balance_iva || "" }
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
            const columnWidth = index === 0 ? 10 : index === 7 ? 32 : index === 5 || index === 6 ? 17 : index === 9 ? 30 : 18;
            pdf.setFont("helvetica", "bold");
            pdf.rect(xPosition, yPosition, columnWidth, tableCellHeight);
            pdf.text(header, xPosition + cellPadding, yPosition + tableCellHeight / 2 + 1.5);

            xPosition += columnWidth;
        });

        yPosition += tableCellHeight;

        // Participant data
        pdf.setFont("helvetica", "normal"); // Non-bold font for participant rows
        let totalRevenue = 0;
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
                participant.address || "", // Address
                participantType || "",
                faculty || "",
                degree || "",
                participant.institution || "",
                `${participant.total_payment} USD` || "$0.00 USD"
            ];

            let maxCellHeight = tableCellHeight;
            totalRevenue += parseFloat(participant.total_payment) || 0;

            participantData.forEach((data, idx) => {
                const cellWidth = idx === 0 ? 10 : idx === 7 ? 32 : idx === 5 || idx === 6 ? 17 : idx === 9 ? 30 : 18;

                const cellContent = pdf.splitTextToSize(data, cellWidth - cellPadding * 2);
                const cellHeight = cellContent.length * tableCellHeight;
                maxCellHeight = Math.max(maxCellHeight, cellHeight); // Track maximum height in the row

                pdf.rect(xPosition, yPosition, cellWidth, tableCellHeight);
                cellContent.forEach((line, lineIndex) => {
                    pdf.text(line, xPosition + cellPadding, yPosition + tableCellHeight / 3 + lineIndex * 2);
                });

                xPosition += cellWidth;
            });

            yPosition += maxCellHeight; // Adjust yPosition based on the tallest cell in the row
        });
        // Fila final para el total recaudado
        // yPosition += tableCellHeight; // Deja un espacio antes del total
        // yPosition += 10; // Deja un espacio antes del total
        pdf.setFont("helvetica", "bold");

        // Calcula la posición x para la etiqueta y el valor total
        const totalLabelXPosition = margin + 135 ;
        const totalValueXPosition = margin + 170; // Ajusta según el ancho acumulado de las columnas previas

        // Agrega el texto del total
        pdf.text("Total Valor Recaudado:", totalLabelXPosition, yPosition - 22);
        pdf.text(`${totalRevenue.toFixed(2)} USD`, totalValueXPosition, yPosition - 22);

        pdf.save("reporte_curso.pdf");
        onClose();
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
                </div>
            </div>
        </div>
    );
}

export default CourseReportModal;
