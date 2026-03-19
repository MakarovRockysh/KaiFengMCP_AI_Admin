import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import OrderManagement from "./components/OrderManagement";
import PaymentManagement from "./components/PaymentManagement";
import FeedbackManagement from "./components/FeedbackManagement";
import DataAnalytics from "./components/DataAnalytics";
import AccountManagement from "./components/AccountManagement";
import PermissionManagement from "./components/PermissionManagement";
import LogManagement from "./components/LogManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: OrderManagement },
      { path: "payments", Component: PaymentManagement },
      { path: "feedback", Component: FeedbackManagement },
      { path: "analytics", Component: DataAnalytics },
      { path: "accounts", Component: AccountManagement },
      { path: "permissions", Component: PermissionManagement },
      { path: "logs", Component: LogManagement },
    ],
  },
]);
