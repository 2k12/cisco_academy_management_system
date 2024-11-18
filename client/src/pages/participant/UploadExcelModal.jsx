import { useState } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";

function UploadExcelModal({ isOpen, onClose }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire({
                icon: "warning",
                title: "Sin archivo",
                text: "Selecciona un archivo antes de continuar.",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("upload-excel", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                icon: "success",
                title: "Carga Completa",
                text: response.data.message,
            });
            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Error subiendo el archivo.",
            });
            console.error("Error subiendo el archivo:", error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Cargar Participantes
                    </h2>
                    <p className="text-sm text-white mb-4">
                        Descarga la plantilla necesaria antes de cargar el archivo:
                        <a
                            href="/templates/Plantilla_Participantes.xlsx"
                            download
                            className="text-green-400 hover:text-green-300 hover:underline ml-1"
                        >
                            Descargar Plantilla
                        </a>
                    </p>
                    <div className="mb-6">
                        <label className="block">
                            <span className="sr-only">Seleccionar archivo</span>
                            <div className="flex items-center justify-between border border-dashed border-gray-500 rounded-md bg-gray-700 p-2">
                                <span className="text-sm text-gray-300 truncate">
                                    {file ? file.name : "Ningún archivo seleccionado"}
                                </span>
                                <label
                                    htmlFor="file_input"
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Seleccionar Archivo
                                </label>
                            </div>
                            <input
                                type="file"
                                id="file_input"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            Subir Archivo
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default UploadExcelModal;
