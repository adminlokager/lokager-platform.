import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LaunchPage from "@/pages/LaunchPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/launch" element={<LaunchPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
