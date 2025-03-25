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
import TeacherDashboard from "../mainMenu/teacherDashboard";
import StudentDasboard from "../mainMenu/studentDashboard";
import ParentDashboard from "../mainMenu/parentDashboard";
import StudentGrid from "../peoples/students/student-grid";
import AddStudent from "../peoples/students/add-student";
import AddStudents from "../user/addStudent";
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

const routes = all_routes;

export const adminRoutes = [
  {
    path: routes.adminDashboard,
    element: <AdminDashboard />,
    route: Route,
  },
  {
    path: routes.dashBoardPop,
    element: <DashBoardPop />,
    route: Route,
  },
  {
    path: routes.scoreCard,
    element: <ScoreCard />,
    route: Route,
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
    path: routes.editQuize,
    element: <EditQuize />,
    route: Route,
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
  },
  {
    path: routes.studyPlan,
    element: <StudyPlan />,
    route: Route,
  },
  {
    path: routes.mockTest,
    element: <MockTest />,
    route: Route,
  },
  {
    path: routes.review,
    element: <Review />,
    route: Route,
  },
  {
    path: routes.classRecording,
    element: <ClassRecording />,
    route: Route,
  },
  {
    path: routes.template,
    element: <Template />,
    route: Route,
  },
  {
    path: routes.notification,
    element: <Notification />,
    route: Route,
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
  },
  {
    path: routes.upComingClass,
    element: <UpComingClass />,
    route: Route,
  },
  {
    path: routes.discountCoupon,
    element: <DiscountCoupon />,
    route: Route,
  },
  {
    path: routes.timeTable,
    element: <TimeTable />,
    route: Route,
  },
  {
    path: routes.courseMaster,
    element: <CourseMaster />,
    route: Route,
  },
  {
    path: routes.quizeCategory,
    element: <QuizeCategory />,
    route: Route,
  },
  {
    path: routes.booking,
    element: <Booking />,
    route: Route,
  },
  {
    path: routes.grammerTemplate,
    element: <GrammerTemplate />,
    route: Route,
  },
  {
    path: routes.quize,
    element: <Quize />,
    route: Route,
  },
  {
    path: routes.institute,
    element: <Institute />,
    route: Route,
  },
  {
    path: routes.institutePlan,
    element: <InstitutePlan />,
    route: Route,
  },
  // {
  //   path: routes.agent,
  //   element: <Agent />,
  //   route: Route,
  // },
  {
    path: routes.loginBanner,
    element: <LoginBanner />,
    route: Route,
  },
  {
    path: routes.user,
    element: <User />,
    route: Route,
  },
  {
    path: routes.teacherDashboard,
    element: <TeacherDashboard />,
    route: Route,
  },
  {
    path: routes.studentDashboard,
    element: <StudentDasboard />,
    route: Route,
  },
  {
    path: routes.parentDashboard,
    element: <ParentDashboard />,
    route: Route,
  },

  {
    path: routes.membershipplan,
    element: <Membershipplan />,
  },
  {
    path: routes.membershipAddon,
    element: <MembershipAddon />,
  },
  {
    path: routes.membershipTransaction,
    element: <MembershipTransaction />,
  },
  // {
  //   path: routes.video,
  //   element: <Video />,
  //   route: Route,
  // },

  {
    path: routes.fileManager,
    element: <FileManager />,
    route: Route,
  },
  {
    path: routes.manageVideo,
    element: <ManageVideo />,
    route: Route,
  },
  {
    path: routes.predictionFile,
    element: <PredictionFile />,
    route: Route,
  },
  {
    path: routes.question,
    element: <Question />,
    route: Route,
  },
  {
    path: routes.userManage,
    element: <UserManage />,
    route: Route,
  },
  {
    path: routes.textEditor,
    element: <TextEditor />,
    route: Route,
  },
  {
    path: routes.studentGrid,
    element: <StudentGrid />,
  },
  {
    path: routes.studentList,
    element: <StudentList />,
  },
  {
    path: routes.addStudent,
    element: <AddStudent />,
  },
  {
    path: routes.addUser,
    element: <AddUser />,
  },
  {
    path: routes.editStudent,
    element: <AddStudent />,
  },

  {
    path: routes.layoutDefault,
    element: <AdminDashboard />,
  },
  {
    path: routes.layoutMini,
    element: <AdminDashboard />,
  },
  {
    path: routes.layoutRtl,
    element: <AdminDashboard />,
  },
  {
    path: routes.layoutBox,
    element: <AdminDashboard />,
  },
  {
    path: routes.layoutDark,
    element: <AdminDashboard />,
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
  },
  {
    path: routes.permissions,
    element: <Permission />,
  },
  {
    path: routes.manageusers,
    element: <Manageusers />,
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
