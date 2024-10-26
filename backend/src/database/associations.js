import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import RolePermission from "../models/RolePermission.js";
import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";
import CourseChapter from "../models/CourseChapter.js";
import CourseParticipant from "../models/CourseParticipant.js"; 
// import CourseDetail from "../models/CourseDetail.js"; 
import Participant from "../models/Participant.js"; 
import InfoUtn from "../models/InfoUtn.js"; 
import ParticipantType from "../models/ParticipantType.js"; 
import ParticipantPayment from "../models/ParticipantPayment.js"; 
import Payment from "../models/Payment.js"; 
import PaymentType from "../models/PaymentType.js"; 
import Detail from "../models/Detail.js";           
import Modality from "../models/Modality.js";       
import Instructor from "../models/Instructor.js";   
import Schedule from "../models/Schedule.js";       
import DetailSchedule from "../models/DetailSchedule.js"; 
import DetailModality from "../models/DetailModality.js"; 
import InstructorCertificate from "../models/InstructorCertificate.js"; 
import Certificate from "../models/Certificate.js"; 
import DetailValues from "../models/DetailValues.js";

export function associateModels() {

  User.belongsTo(Role, { foreignKey: "role_id" }); 
  Role.hasMany(User, { foreignKey: "role_id" }); 

  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
  });

  // * bloque 1
  Course.belongsToMany(Chapter, {
    through: CourseChapter,
    foreignKey: "course_id",
  });

  Chapter.belongsToMany(Course, {
    through: CourseChapter,
    foreignKey: "chapter_id",
  });
  // ******************

  // * bloque 2

  Course.belongsTo(Detail, { foreignKey: "detail_id" }); 
  Detail.hasMany(Course, { foreignKey: "detail_id" }); 

  Course.belongsToMany(Participant, {
    through: CourseParticipant,
    foreignKey: "course_id",
  });

  Participant.belongsToMany(Course, {
    through: CourseParticipant,
    foreignKey: "participant_id",
  });

  Participant.belongsTo(ParticipantType, { foreignKey: "participant_type_id" });
  ParticipantType.hasMany(Participant, { foreignKey: "participant_type_id" });

  Participant.belongsTo(InfoUtn, { foreignKey: "info_utn_id" });
  InfoUtn.hasMany(Participant, { foreignKey: "info_utn_id" });

  Participant.belongsToMany(Payment, {
    through: ParticipantPayment,
    foreignKey: "participant_id",
  });

  Payment.belongsToMany(Participant, {
    through: ParticipantPayment,
    foreignKey: "payment_id",
  });

  Payment.belongsTo(PaymentType, { foreignKey: "payment_type_id" });
  PaymentType.hasMany(Payment, { foreignKey: "payment_type_id" });

  // ******************

  // * bloque 3
  // Course.belongsToMany(Detail, {
  //   through: CourseDetail,
  //   foreignKey: "course_id",
  // });

  // Detail.belongsToMany(Course, {
  //   through: CourseDetail,
  //   foreignKey: "detail_id",
  // });

  Detail.belongsTo(Instructor, { foreignKey: "instructor_id" });
  Instructor.hasMany(Detail, { foreignKey: "instructor_id" });

  Instructor.belongsToMany(Certificate, {
    through: InstructorCertificate,
    foreignKey: "instructor_id",
  });

  Certificate.belongsToMany(Instructor, {
    through: InstructorCertificate,
    foreignKey: "certificate_id",
  });

  Detail.belongsTo(DetailValues, { foreignKey: "detail_value_id" });
  DetailValues.hasMany(Detail, { foreignKey: "detail_value_id" });

  Detail.belongsToMany(Modality, {
    through: DetailModality,
    foreignKey: "detail_id",
  });

  Modality.belongsToMany(Detail, {
    through: DetailModality,
    foreignKey: "modality_id",
  });

  Detail.belongsToMany(Schedule, {
    through: DetailSchedule,
    foreignKey: "detail_id",
  });

  Schedule.belongsToMany(Detail, {
    through: DetailSchedule,
    foreignKey: "schedule_id",
  });
  // ******************

  Certificate.belongsTo(User, { foreignKey: "created_by" });
  Chapter.belongsTo(User, { foreignKey: "created_by" });
  Course.belongsTo(User, { foreignKey: "created_by" });
  CourseChapter.belongsTo(User, { foreignKey: "created_by" });
  CourseParticipant.belongsTo(User, { foreignKey: "created_by" });
    // CourseDetail.belongsTo(User, { foreignKey: "created_by" });
  Detail.belongsTo(User, { foreignKey: "created_by" });
  DetailModality.belongsTo(User, { foreignKey: "created_by" });
  DetailSchedule.belongsTo(User, { foreignKey: "created_by" });
  DetailValues.belongsTo(User, { foreignKey: "created_by" });
  InfoUtn.belongsTo(User, { foreignKey: "created_by" });
  Instructor.belongsTo(User, { foreignKey: "created_by" });
  InstructorCertificate.belongsTo(User, { foreignKey: "created_by" });
  Modality.belongsTo(User, { foreignKey: "created_by" });
  Participant.belongsTo(User, { foreignKey: "created_by" });
  ParticipantPayment.belongsTo(User, { foreignKey: "created_by" });
  ParticipantType.belongsTo(User, { foreignKey: "created_by" });
  Payment.belongsTo(User, { foreignKey: "created_by" });
  PaymentType.belongsTo(User, { foreignKey: "created_by" });
  Permission.belongsTo(User, { foreignKey: "created_by" });
  Role.belongsTo(User, { foreignKey: "created_by" });
  RolePermission.belongsTo(User, { foreignKey: "created_by" });
  Schedule.belongsTo(User, { foreignKey: "created_by" });
}
