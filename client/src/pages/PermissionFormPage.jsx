// import { useForm } from "react-hook-form";
// import { usePermission } from "../context/PermissionContext";
// function PermissionFormPage() {

//   const { register, handleSubmit } = useForm();
//   const { createPermission } = usePermission();

//   const onSubmit = handleSubmit((data) => {
//     createPermission(data);
//   })

//   return (
//     <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
//       <form onSubmit={onSubmit}>
//         <input type="text"
//           placeholder="nombre"
//           {...register("name")}
//           className="w-full bg-zinc-7000 text-white px-4 py-2 rounded-md my-2"
//           autoFocus />

//         <textarea rows={3}
//           placeholder="descripción"
//           {...register("description")}
//           className="w-full bg-zinc-7000 text-white px-4 py-2 rounded-md my-2"

//         ></textarea>
//         <button type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md my-2 transition-colors"
//         >Guardar</button>
//       </form>
//     </div>
//   )
// }

// export default PermissionFormPage

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { usePermission } from "../context/PermissionContext";

function PermissionFormPage({ onClose, permission }) {
  const { register, handleSubmit, setValue } = useForm();
  const { createPermission, updatePermission } = usePermission();

  useEffect(() => {
    if (permission) {
      setValue("name", permission.name);
      setValue("description", permission.description);
    }
  }, [permission, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (permission) {
      updatePermission({ ...data, id: permission.permission_id });
    } else {
      createPermission(data);
    }
    onClose();
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombre del permiso"
          {...register("name")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <textarea
          rows={3}
          placeholder="Descripción"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
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

export default PermissionFormPage;
