import { Route } from "react-router";
import { all_routes } from "./all_routes";
import Membershipplan from "../membership/membershipplan";
import MembershipAddon from "../membership/membershipaddon";
import ComingSoon from "../pages/comingSoon";
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import ForgotPassword from "../auth/forgotPassword/forgotPassword";
import FileManager from "../application/fileManager";
import MembershipTransaction from "../membership/membershiptrasaction";
import TextEditor from "../uiInterface/advanced-ui/texteditor";
import AdminDashboard from "../mainMenu/adminDashboard";
import WelcomeDashboard from "../mainMenu/welcomeDashboard";
import TeacherDashboard from "../mainMenu/teacherDashboard";
import StudentDasboard from "../mainMenu/studentDashboard";
import ParentDashboard from "../mainMenu/parentDashboard";
import StudentGrid from "../peoples/students/student-grid";
import StudentDetails from "../peoples/students/student-details/studentDetails";
import AddStudents from "../user/addStudent";
// import AddStudent from "../peoples/students/add-student";
import AddStudent from "../user/addStudent";
import StudentList from "../user/studentList";
import Login2 from "../auth/login/login-2";
import Login3 from "../auth/login/login-3";
import RolesPermissions from "../userManagement/rolesPermissions";
import Permission from "../userManagement/permission";
import Manageusers from "../userManagement/manageusers";
import AllBlogs from "../content/blog/allBlogs";
import BlogCategories from "../content/blog/blogCategories";
import BlogComments from "../content/blog/blogComments";
import BlogTags from "../content/blog/blogTags";
import AccountsIncome from "../accounts/accounts-income";
import AccountsInvoices from "../accounts/accounts-invoices";
import AccountsTransactions from "../accounts/accounts-transactions";
import AddInvoice from "../accounts/add-invoice";
import EditInvoice from "../accounts/edit-invoice";
import Invoice from "../accounts/invoice";
import Profile from "../pages/profile";
import NotificationActivities from "../pages/profile/activities";
import Visitor from "../visitor/visitor";
import DashBoardPop from "../dashboardpop/dashBoardpop";
import ClassRecording from "../classrecording/classRecording";
import UpComingClass from "../upcomingclass/upComingClass";
import LoginBanner from "../loginbanner/loginBanner";
import User from "../user/studentList";
import ManageVideo from "../managevideo/manageVideo";
import PredictionFile from "../predictionfile/predictionFile";
import Question from "../question/question";
import QuestionAdd from "../question/questionAdd";
import QuestionEdit from "../question/questionEdit";
import MockTest from "../mock/mockTest";
import Template from "../template/template";
import GrammerTemplate from "../grammertemplate/grammerTemplate";
import ScoreCard from "../scorecard/scoreCard";
import Review from "../review/review";
import Notification from "../notification/notification";
import StudyPlan from "../studyplan/studyPlan";
import ExceptionalWords from "../exceptionalwords/exceptionalWords";
import TimeTable from "../timetable/timeTable";
import QuizeCategory from "../quizecategory/quizeCategory";
import Quize from "../quizecategory/quize";
import Institute from "../institute/institute";
import InstitutePlan from "../instituteplan/institutePlan";
import Booking from "../bookingmaster/booking";
import CourseMaster from "../bookingmaster/courseMaster";
import DiscountCoupon from "../bookingmaster/discountCoupon";
import UserManage from "../user/userManage";
import AddUser from "../user/addUser";
import QuizeList from "../quizecategory/quizeList";
import EditQuize from "../quizecategory/editQuize";
import MockList from "../mock/mockList";
import StudentAttendance from "../hrm/attendance/student-attendance";
import MockEdit from "../mock/mockEdit";
import AssignCourse from "../user/assignCourse";
import StudentEdit from "../user/studentEdit";
import MockActivity from "../user/mockActivity";
import MembershipHistory from "../membership/membershipHistory";
import Score from "../user/score/index"
import StudentListDashboard from "../mainMenu/studentDashboard/studentListDashboard";
import TeacherListDashboard from "../mainMenu/teacherDashboard/teacherListDashboard";
import WhiteListDashboard from "../mainMenu/whiteLabelDashboard/whiteListDashboard";
import WhiteLabelDashboard from "../mainMenu/whiteLabelDashboard";

const routes = all_routes;
const dummyOnAddQuestion = () => {};
export const adminRoutes = [
  {
    path: routes.adminDashboard,
    element: <AdminDashboard />,
    route: Route,
    permission: "VIEW_DASHBOARD",
  },
  {
    path: routes.welcomeDashboard,
    element: <WelcomeDashboard />,
    route: Route,
    permission: "VIEW_WELCOME_DASHBOARD",
  },
  {
    path: routes.dashBoardPop,
    element: <DashBoardPop />,
    route: Route,
    permission: "LIST_ADS",
  },
  {
    path: routes.scoreCard,
    element: <ScoreCard />,
    route: Route,
    permission: "LIST_SCORECARDS",
  },
  {
    path: routes.mockList,
    element: <MockList />,
    route: Route,
  },
  {
    path: routes.studentAttendance,
    element: <StudentAttendance />,
    route: Route,
  },
  {
    path: routes.whiteListDashboard,
    element: <WhiteListDashboard />,
    route: Route,
  },
  {
    path: routes.whiteLabelDashboard,
    element: <WhiteLabelDashboard />,
    route: Route,
  },
  {
    path: routes.mockEdit,
    element: <MockEdit />,
    route: Route,
  },
  {
    path: routes.membershipHistory,
    element: <MembershipHistory />,
    route: Route,
  },
  {
    path: routes.studentEdit,
    element: <StudentEdit />,
    route: Route,
  },
  {
    path: routes.teacherListDashboard,
    element: <TeacherListDashboard />,
    route: Route,
  },
  {
    path: routes.mockActivity,
    element: <MockActivity />,
    route: Route,
  },
  {
    path: routes.assignCourse,
    element: <AssignCourse />,
    route: Route,
  },
  {
    path: routes.score,
    element: <Score />,
    route: Route,
  },
  {
    path: routes.editQuize,
    element: <EditQuize />,
    route: Route,
    permission: "EDIT_QUIZ",
  },
  {
    path: routes.addStudents,
    element: <AddStudents />,
    route: Route,
  },
  {
    path: routes.visitor,
    element: <Visitor />,
    route: Route,
    permission: "LIST_VISITOR",
  },
  {
    path: routes.studyPlan,
    element: <StudyPlan />,
    route: Route,
    permission: "LIST_STUDY_PLANS",
  },
  {
    path: routes.mockTest,
    element: <MockTest />,
    route: Route,
    permission: "LIST_MOCKTEST",
  },
  {
    path: routes.review,
    element: <Review />,
    route: Route,
    permission: "LIST_REVIEWS",
  },
  {
    path: routes.classRecording,
    element: <ClassRecording />,
    route: Route,
    permission: "LIST_RECORDINGS",
  },
  {
    path: routes.template,
    element: <Template />,
    route: Route,
    permission: "LIST_TEMPLATES",
  },
  {
    path: routes.notification,
    element: <Notification />,
    route: Route,
    permission: "LIST_NOTIFICATIONS",
  },
  {
    path: routes.quizeList,
    element: <QuizeList />,
    route: Route,
  },
  {
    path: routes.exceptionalWords,
    element: <ExceptionalWords />,
    route: Route,
    permission: "LIST_EXCEPTIONAL_WORDS",
  },
  {
    path: routes.upComingClass,
    element: <UpComingClass />,
    route: Route,
    permission: "LIST_UPCOMING_CLASSES",
  },
  {
    path: routes.discountCoupon,
    element: <DiscountCoupon />,
    route: Route,
    permission: "LIST_COUPON",
  },
  {
    path: routes.timeTable,
    element: <TimeTable />,
    route: Route,
    permission: "LIST_TIMETABLES",
  },
  {
    path: routes.courseMaster,
    element: <CourseMaster />,
    route: Route,
    permission: "LIST_PLAN",
  },
  {
    path: routes.quizeCategory,
    element: <QuizeCategory />,
    route: Route,
    permission: "LIST_QUIZ_CATEGORIES",
  },
  {
    path: routes.booking,
    element: <Booking />,
    route: Route,
    permission: "LIST_BOOKING",
  },
  {
    path: routes.grammerTemplate,
    element: <GrammerTemplate />,
    route: Route,
    permission: "LIST_GRAMMARS",
  },
  {
    path: routes.quize,
    element: <Quize />,
    route: Route,
    permission: "LIST_QUIZZES",
  },
  {
    path: routes.institute,
    element: <Institute />,
    route: Route,
    permission: "LIST_INSTITUTE",
  },
  {
    path: routes.institutePlan,
    element: <InstitutePlan />,
    route: Route,
    permission: "LIST_INSTITUTE_PLAN",
  },
  {
    path: routes.loginBanner,
    element: <LoginBanner />,
    route: Route,
    permission: "MANAGE_BANNER",
  },
  {
    path: routes.user,
    element: <User />,
    route: Route,
    permission: "LIST_USERS",
  },
  {
    path: routes.teacherDashboard,
    element: <TeacherDashboard />,
    // route: Route,
    // permission: "TEACHER_DASHBOARD",
  },
  {
    path: routes.studentDashboard,
    element: <StudentDasboard />,
    // route: Route,
    // permission: "STUDENT_DASHBOARD",
  },
  {
    path: routes.parentDashboard,
    element: <ParentDashboard />,
    route: Route,
    permission: "PARENT_DASHBOARD",
  },
  {
    path: routes.studentListDashboard,
    element: <StudentListDashboard />,
  },

  {
    path: routes.membershipplan,
    element: <Membershipplan />,
    permission: "LIST_PLAN",
  },
  {
    path: routes.membershipAddon,
    element: <MembershipAddon />,
    permission: "LIST_PLAN",
  },
  {
    path: routes.membershipTransaction,
    element: <MembershipTransaction />,
    permission: "LIST_PLAN",
  },

  {
    path: routes.manageVideo,
    element: <ManageVideo />,
    route: Route,
    permission: "LIST_VIDEOS",
  },
  {
    path: routes.predictionFile,
    element: <PredictionFile />,
    route: Route,
    permission: "LIST_PREDICTIONS",
  },
  {
    path: routes.question,
    element: <Question />,
    route: Route,
    permission: "LIST_QUESTIONS",
  },
  {
    path: routes.questionAdd,
    element: <QuestionAdd onAddQuestion={dummyOnAddQuestion} />,
    route: Route,
    permission: "CREATE_QUESTIONS",
  },
  {
    path: routes.questionEdit,
    element: <QuestionEdit />,
    route: Route,
    permission: "EDIT_QUESTIONS",
  },
  {
    path: routes.userManage,
    element: <UserManage />,
    route: Route,
    permission: "LIST_USERS",
  },
  {
    path: routes.studentList,
    element: <StudentList />,
    permission: "LIST_USERS",
  },
  {
    path: routes.studentDetail,
    element: <StudentDetails />,
  },
  
  {
    path: routes.addStudent,
    element: <AddStudent />,
    permission: "CREATE_USER",
  },
  {
    path: routes.addUser,
    element: <AddUser />,
    permission: "CREATE_USER",
  },
  {
    path: routes.editStudent,
    element: <AddStudent />,
    permission: "EDIT_USER",
  },

  {
    path: routes.accountsIncome,
    element: <AccountsIncome />,
  },
  {
    path: routes.accountsInvoices,
    element: <AccountsInvoices />,
  },
  {
    path: routes.accountsTransactions,
    element: <AccountsTransactions />,
  },
  {
    path: routes.addInvoice,
    element: <AddInvoice />,
  },
  {
    path: routes.editInvoice,
    element: <EditInvoice />,
  },
  {
    path: routes.invoice,
    element: <Invoice />,
  },
  {
    path: routes.rolesPermissions,
    element: <RolesPermissions />,
    permission: "LIST_ROLES",
  },
  {
    path: routes.permissions,
    element: <Permission />,
    permission: "LIST_ROLES",
  },
  {
    path: routes.manageusers,
    element: <Manageusers />,
    permission: "LIST_USERS",
  },
  {
    path: routes.allBlogs,
    element: <AllBlogs />,
  },
  {
    path: routes.blogCategories,
    element: <BlogCategories />,
  },
  {
    path: routes.blogComments,
    element: <BlogComments />,
  },
  {
    path: routes.blogTags,
    element: <BlogTags />,
  },
  {
    path: routes.profile,
    element: <Profile />,
  },
  {
    path: routes.activity,
    element: <NotificationActivities />,
  },
];

export const authRoutes = [
  {
    path: routes.comingSoon,
    element: <ComingSoon />,
    route: Route,
  },
  {
    path: routes.login,
    element: <Login />,
    route: Route,
  },
  {
    path: routes.login2,
    element: <Login2 />,
    route: Route,
  },
  {
    path: routes.login3,
    element: <Login3 />,
    route: Route,
  },
  {
    path: routes.register,
    element: <Register />,
    route: Route,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
  },
];
