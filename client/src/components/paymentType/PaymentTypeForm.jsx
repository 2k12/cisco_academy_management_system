import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { usePaymentType } from "../../context/PaymentTypeContext";

function PaymentTypeForm({ onClose, payment_type }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createPaymentType, updatePaymentType } = usePaymentType();

    useEffect(() => {
        if (payment_type) {
            setValue("name", payment_type.name);
        }
    }, [payment_type, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (payment_type) {
            updatePaymentType({ ...data, id: payment_type.payment_type_id });
        } else {
            createPaymentType(data);
        }
        onClose();
    });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Tipo de Pago</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Tipo de Participante"
                    {...register("name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
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

export default PaymentTypeForm;
