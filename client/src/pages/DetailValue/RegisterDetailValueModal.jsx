import DetailValueForm from "../../components/detailValue/DetailValueForm";

function RegisterDetailValueModal({ isOpen, onClose, detail_value }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2">X</button>
        <DetailValueForm onClose={onClose} detail_value={detail_value} />
      </div>
    </div>
  );
}

export default RegisterDetailValueModal;
