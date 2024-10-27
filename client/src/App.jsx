import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { PermissionProvider } from "./context/PermissionContext";
import { InstructorProvider } from "./context/InstructorContext";
import { ModalityProvider } from "./context/ModalityContext";
import { ParticipantTypeProvider } from "./context/ParticipantTypeContext";
import { ChapterProvider } from "./context/ChapterContext";
import { ScheduleProvider } from "./context/ScheduleContext";
import { RoleProvider } from "./context/RoleContext";
import { InfoUtnProvider } from "./context/InfoUtnContext";
import { CourseProvider } from "./context/CourseContext";
import { CertificateProvider } from "./context/CertificateContext";
import { DetailValuesProvider } from "./context/DetailValuesContext";
import { PaymentTypeProvider } from "./context/PaymentTypeContext";
import { PaymentProvider } from "./context/PaymentContext";
import { ParticipantProvider } from "./context/ParticipantContext";


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


import Navbar from "./components/Navbar";



import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <PermissionProvider>
          <InstructorProvider>
            <ParticipantTypeProvider>
              <ModalityProvider>
                <RoleProvider>
                  <ChapterProvider>
                    <ScheduleProvider>
                      <InfoUtnProvider>
                        <CertificateProvider>
                          <DetailValuesProvider>
                            <PaymentTypeProvider>
                              <PaymentProvider>
                                <ParticipantProvider>



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



                                        {/* <Route path="/add-instructor" element={<PermissionFormPage />} /> */}
                                        {/* <Route path="/instructor/:id" element={<h1>Update Permission</h1>} /> */}
                                      </Route>

                                    </Routes>

                                  </BrowserRouter>


                                </ParticipantProvider>
                              </PaymentProvider>
                            </PaymentTypeProvider>
                          </DetailValuesProvider>
                        </CertificateProvider>
                      </InfoUtnProvider>
                    </ScheduleProvider>
                  </ChapterProvider>
                </RoleProvider>
              </ModalityProvider>
            </ParticipantTypeProvider>
          </InstructorProvider>
        </PermissionProvider>
      </CourseProvider>
    </AuthProvider>
  )
}

export default App