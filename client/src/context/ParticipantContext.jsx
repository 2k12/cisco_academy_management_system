import { createContext, useContext, useState } from "react";
import {
    getParticipantsDropdownRequest,
    getParticipantsRequest
} from "../api/participant";

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

    //   const createInstructor = async (instructor) => {
    //     const res = await createInstructorsRequest(instructor);
    //     console.log(res);
    //   };

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
