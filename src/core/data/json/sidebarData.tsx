import { all_routes } from "../../../feature-module/router/all_routes";
const routes = all_routes;

export const SidebarData = [
  {
    label: "MAIN",
    submenuOpen: false,
    showSubRoute: false,
    submenuHdr: "Main",
    submenuItems: [
      {
        label: "Dashboard",
        icon: "ti ti-layout-dashboard",
        submenu: false,
        showSubRoute: false,
        link: routes.adminDashboard,
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Marketing",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Marketing",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Visitor", link: routes.visitor },
          { label: "Dashboard popup", link: routes.dashBoardPop },
          { label: "Login Banner", link: routes.loginBanner },
          { label: "Review", link: routes.review },
          { label: "Manage Video", link: routes.manageVideo },
          { label: "sore card", link: routes.scoreCard },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "User management",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "User management",
        icon: "ti ti-layout-sidebar",
        submenu: true,
        showSubRoute: false,
        link: routes.visitor,
        themeSetting: true,
        submenuItems: [
          { label: "Users", link: routes.studentList },
          { label: "Roles & Permissions", link: routes.rolesPermissions },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Finance & Accounts",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Accounts & Finance",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Income", link: routes.accountsIncome },
          {
            label: "Invoices",
            link: routes.accountsInvoices,
            subLink1: routes.addInvoice,
            subLink2: routes.editInvoice,
          },
          { label: "Invoice View", link: routes.invoice },
          { label: "Transactions", link: routes.accountsTransactions },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Study Plan",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Study Plan",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Timetable", link: routes.timeTable },
          { label: "Class Recordings", link: routes.classRecording },
          { label: "Study Plan", link: routes.studyPlan },
          { label: "Upcoming Classes", link: routes.upComingClass },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Study Material",
    submenu: true,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Study Material",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Prediction file", link: routes.predictionFile },
          { label: "Question", link: routes.question },
          { label: "Mock test", link: routes.mockTest },
          { label: "Grammar templates", link: routes.grammerTemplate },
          { label: "Templates", link: routes.template },
          {
            label: "Grammar Quiz",
            icon: "ti ti-layout-align-left",
            submenu: true,
            showSubRoute: false,
            link: routes.dashBoardPop,
            themeSetting: true,
            submenuItems: [
              {
                label: "Category Master",
                link: routes.quizeCategory,
              },
              {
                label: "Quize Management",
                link: routes.quize,
                submenu: true,
                submenuItems: [{ label: "Quizzes", link: routes.quize }],
              },
            ],
          },
          { label: "Exceptional words ", link: routes.exceptionalWords },
        ],
      },
    ],
  },
  {
    // label: "LAYOUT",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Membership Plan",
    submenuItems: [
      {
        label: "Membership Plan",
        icon: "ti ti-layout-align-left",
        submenu: false,
        showSubRoute: false,
        link: routes.membershipplan,
        themeSetting: true,
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Content",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Content",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Blog", link: routes.timeTable },
          { label: "FAQ", link: routes.classRecording },
          { label: "EMAIL MARKETING", link: routes.studyPlan },
          { label: "EMAIL TEMPLATES", link: routes.upComingClass },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "Notification",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "Notification",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Student Practice", link: routes.notification },
          { label: "App Notification" },
          { label: "Teacher Remarks" },
        ],
      },
    ],
  },
  {
    // label: "LAYOUT",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "User management",
    submenuItems: [
      {
        label: "Booking Master",
        icon: "ti ti-layout-align-left",
        submenu: true,
        showSubRoute: false,
        link: routes.dashBoardPop,
        themeSetting: true,
        submenuItems: [
          { label: "Agent", link: routes.agent },
          { label: "Course Master", link: routes.courseMaster },
          { label: "Bookings", link: routes.booking },
          { label: "Discount Coupon", link: routes.discountCoupon },
        ],
      },
    ],
  },
  {
    // label: "Finance & Accounts",
    submenuOpen: true,
    submenuHdr: "White Labelling",
    submenu: false,
    showSubRoute: false,
    submenuItems: [
      {
        label: "White Labelling",
        icon: "ti ti-swipe",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Institute", link: routes.institute },
          { label: "Institute Plan", link: routes.institutePlan },
        ],
      },
    ],
  },
];
