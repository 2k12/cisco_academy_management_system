// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalProvider from "./GlobalProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PermissionPage from "./pages/PermissionPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import PermissionFormPage from "./pages/PermissionFormPage";
import InstructorPage from "./pages/Instructor/InstructorPage";
import ModalityPage from "./pages/Modality/ModalityPage";
import ParticipantTypePage from "./pages/Participant_Type/ParticipantTypePage";
import RolePage from "./pages/Role/RolePage";
import ChapterPage from "./pages/Chapter/ChapterPage";
import SchedulePage from "./pages/Schedule/SchedulePage";
import InfoUtnPage from "./pages/InfoUtn/InfoUtnPage";
import CoursePage from "./pages/Course/CoursePage";
import PreviewCoursePage from "./pages/Course/PreviewCoursePage";
import CertificatePage from "./pages/Certificate/CertificatePage";
import DetailValuePage from "./pages/DetailValue/DetailValuePage";
import PaymentTypePage from "./pages/Payment_Type/PaymentTypePage";
import PaymentPage from "./pages/Payment/PaymentPage";
import ParticipantPage from "./pages/participant/ParticipantPage";
import DetailPage from "./pages/Detail/DetailPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/permissions" element={<PermissionPage />} />
            <Route path="/add-permission" element={<PermissionFormPage />} />
            <Route path="/permission/:id" element={<h1>Update Permission</h1>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/instructors" element={<InstructorPage />} />
            <Route path="/modalities" element={<ModalityPage />} />
            <Route path="/participant-types" element={<ParticipantTypePage />} />
            <Route path="/roles" element={<RolePage />} />
            <Route path="/chapters" element={<ChapterPage />} />
            <Route path="/schedules" element={<SchedulePage />} />
            <Route path="/infos_utn" element={<InfoUtnPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/preview-course/:id" element={<PreviewCoursePage />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/detail-values" element={<DetailValuePage />} />
            <Route path="/payment-types" element={<PaymentTypePage />} />
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/participants" element={<ParticipantPage />} />
            <Route path="/details" element={<DetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
