// // import React from "react";
// import PermissionFormPage from "./PermissionFormPage";

// function RegisterPermissionModal({ isOpen, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
//         <button onClick={onClose} className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2">X</button>
//         <PermissionFormPage onClose={onClose} />
//       </div>
//     </div>
//   );
// }

// export default RegisterPermissionModal;


import PermissionFormPage from "./PermissionFormPage";

function RegisterPermissionModal({ isOpen, onClose, permission }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="text-white bg-red-500 px-3 py-1 rounded-lg absolute top-2 right-2">X</button>
        <PermissionFormPage onClose={onClose} permission={permission} />
      </div>
    </div>
  );
}

export default RegisterPermissionModal;
