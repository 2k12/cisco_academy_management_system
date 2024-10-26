import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDetailValues } from "../../context/DetailValuesContext"; // Contexto para manejar capítulos

function DetailValueForm({ onClose, detail_value }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createDetailValue, updateDetailValue } = useDetailValues();

    useEffect(() => {
        if (detail_value) {
            setValue("total_amount", detail_value.total_amount);
            setValue("instructor_payment", detail_value.instructor_payment);
            setValue("balance", detail_value.balance);
        }
    }, [detail_value, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (detail_value) {
            updateDetailValue({ ...data, id: detail_value.detail_value_id });
        } else {
            console.log("------")
            console.log(data)
            console.log("------")
            createDetailValue(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Capítulo</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Total Recaudado"
                    {...register("total_amount", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Pago Instructor"
                    {...register("instructor_payment")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="text"
                    placeholder="Saldo a Favor"
                    {...register("balance")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
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

export default DetailValueForm;
