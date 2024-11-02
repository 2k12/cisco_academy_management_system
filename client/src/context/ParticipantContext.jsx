import { createContext, useContext, useState } from "react";
import {
    getParticipantsDropdownRequest,
    getParticipantsRequest,
    createParticipantRequest,
    updateParticipantRequest
} from "../api/participant";
import Swal from "sweetalert2"; // Importa SweetAlert

const ParticipantContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useParticipant = () => {
    const context = useContext(ParticipantContext);

    if (!context) {
        throw new Error("useParticipant must be used within a ParticipantProvider");
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export function ParticipantProvider({ children }) {
    const [participants, setParticipants] = useState([]);
    //   const [allinstructorsforreport, setAllInstructorsForReport] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const createParticipant = async (participant) => {
        const res = await createParticipantRequest(participant);
        console.log(res);
        getParticipants({ page: currentPage }); // Obtener la lista actualizada

    };

    const getParticipants = async ({ search = '', page = 1, limit = 15 }) => {
        try {
            const res = await getParticipantsRequest({ search, page, limit });
            setParticipants(res.data.participants);
            //   console.log(res.data.instructors);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const updateParticipant = async (participant) => {
        try {
            const res = await updateParticipantRequest(participant);
            Swal.fire({ // Muestra el mensaje de éxito
                icon: 'success',
                title: 'Éxito',
                text: res.data.message,
            });
            console.log(res);
            getParticipants({ page: currentPage }); 
        } catch (error) {
            console.log(error);
        }
    };

    //   const getAllInstructors = async ({ search = '', page = 1, limit = 1000 }) => {
    //     try {
    //       const res = await getAllInstructorsRequest({ search, page, limit });
    //       setAllInstructorsForReport(res.data.instructors);
    //     //   setTotalPages(res.data.totalPages);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const getParticipantsDropdown = async () => {
        try {
            const res = await getParticipantsDropdownRequest();
            setParticipants(res.data.participants);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <ParticipantContext.Provider
            value={{
                participants,
                getParticipants,
                createParticipant,
                updateParticipant,
                // createInstructor,
                // getAllInstructors,
                // allinstructorsforreport,
                totalPages,
                currentPage,
                setCurrentPage,
                getParticipantsDropdown
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );
}
