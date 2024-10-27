import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePaymentType } from "../../context/PaymentTypeContext"; // Contexto para manejar capítulos
import { useParticipant } from "../../context/ParticipantContext";
import { usePayment } from "../../context/PaymentContext";

function PaymentForm({ onClose, payment }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createPayment, updatePayment } = usePayment();

    const { paymentTypes, getPaymentTypesDropdown } = usePaymentType();
    const { participants, getParticipantsDropdown } = useParticipant();
    
    const [selectedPaymentType, setSelectedPaymentType] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState("");

    // Función para convertir la fecha de la base de datos al formato de 'datetime-local'
    // const formatDateForInput = (dateString) => {
    //     if (!dateString) return "";
    //     const date = new Date(dateString);
    //     // Formato: YYYY-MM-DDTHH:MM
    //     return date.toISOString().slice(0, 16);
    // };

    useEffect(() => {
        getPaymentTypesDropdown();
        getParticipantsDropdown();

        if (payment) {
            console.log("---------");
            console.log(payment);
            console.log("---------");

            setValue("description", payment.description);
            setValue("amount", payment.amount);
            setSelectedPaymentType(payment.payment_type_id);
            setSelectedParticipant(payment.Participants[0]?.participant_id);
            
        }
    }, [payment, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (payment) {
            // updatePayment({ ...data, id: payment.payment_id, payment_type_id: selectedPaymentType, participant_id: selectedParticipant });
        } else {
            createPayment({ ...data, payment_type_id: selectedPaymentType , participant_id: selectedParticipant });
        }
        onClose();
    });
    const handleSelected = (id) => {
        setSelectedPaymentType(id);
    };

    const handleSelectedParticipant = (id) => {
        setSelectedParticipant(id);
    };
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-center text-2xl text-white">Pago</h2>
            <form onSubmit={onSubmit}>
                <textarea
                    rows={3}
                    placeholder="Descripción"
                    {...register("description")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                ></textarea>
                <input
                    type="number"
                    placeholder="Monto"
                    {...register("amount")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <select
                    // {...register("course_name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedPaymentType}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelected(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Tipo de Pago</option>
                    {paymentTypes.map((payment_type) => (
                        <option key={payment_type.payment_type_id} value={payment_type.payment_type_id}>
                            {payment_type.name}
                        </option>
                    ))}
                </select>
                <select
                    // {...register("course_name")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    value={selectedParticipant}
                    onChange={(e) => {
                        console.log(e.target.value);
                        handleSelectedParticipant(e.target.value);
                    }}
                >
                    <option value="">Seleccionar Participante</option>
                    {participants.map((participant) => (
                        <option key={participant.participant_id} value={participant.participant_id}>
                            {participant.name}
                        </option>
                    ))}
                </select>
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

export default PaymentForm;
