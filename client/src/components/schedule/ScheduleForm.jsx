import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSchedule } from "../../context/ScheduleContext"; // Contexto para manejar horarios

function ScheduleForm({ onClose, schedule }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createSchedule, updateSchedule } = useSchedule();

    // Mapeo para días de la semana
    const daysOfWeek = [
        { label: "Lunes", value: 1 },
        { label: "Martes", value: 2 },
        { label: "Miércoles", value: 3 },
        { label: "Jueves", value: 4 },
        { label: "Viernes", value: 5 },
        { label: "Sábado", value: 6 },
        { label: "Domingo", value: 7 },
    ];

    // Función para manejar la conversión de días seleccionados a formato numérico con guiones
    const formatDaysForInput = (daysString) => {
        if (!daysString) return [];
        return daysString.split('-').map(Number);
    };

    // Función para convertir la selección de días en la cadena de números "1-2-3"
    const formatDaysForStorage = (daysArray) => {
        return daysArray.join('-');
    };

    useEffect(() => {
        if (schedule) {
            setValue("start_time", schedule.start_time);
            setValue("end_time", schedule.end_time);
            setValue("days", formatDaysForInput(schedule.days)); // Convertimos los días a un array de números
        }
    }, [schedule, setValue]);

    const onSubmit = handleSubmit((data) => {
        const formattedData = {
            ...data,
            days: formatDaysForStorage(data.days), // Convertimos el array de días a la cadena "1-2-3"
        };
        if (schedule) {
            updateSchedule({ ...formattedData, id: schedule.schedule_id });
        } else {
            createSchedule(formattedData);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Horario</h2>
            <form onSubmit={onSubmit}>
                <div className="my-2">
                    <label className="text-white">Selecciona los días:</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {daysOfWeek.map((day) => (
                            <label key={day.value} className="text-white">
                                <input
                                    type="checkbox"
                                    value={day.value}
                                    {...register("days")}
                                    className="mr-2"
                                />
                                {day.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="my-2">
                    <label className="text-white">Hora de Inicio:</label>
                    <input
                        type="time"
                        {...register("start_time")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    />
                </div>

                <div className="my-2">
                    <label className="text-white">Hora de Fin:</label>
                    <input
                        type="time"
                        {...register("end_time")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-colors"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default ScheduleForm;
