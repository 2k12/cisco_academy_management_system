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
import { DetailProvider } from "./context/DetailContext"; // Ensure path and casing are correct

const GlobalProvider = ({ children }) => (
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
                                <DetailProvider>{children}</DetailProvider>
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
);

export default GlobalProvider;
