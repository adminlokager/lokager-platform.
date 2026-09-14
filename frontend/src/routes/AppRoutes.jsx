import { Routes, Route } from "react-router-dom";
import EntryPage from "@/pages/EntryPage";
import HomePage from "@/pages/HomePage";
import LaunchPage from "@/pages/LaunchPage";
import VerticalListingPage from "@/pages/VerticalListingPage";
import MortgagePage from "@/pages/MortgagePage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import SavedPage from "@/pages/SavedPage";
import ComparePage from "@/pages/ComparePage";
import NotFoundPage from "@/pages/NotFoundPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<EntryPage />} />
    <Route path="/launch" element={<LaunchPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/buy" element={<VerticalListingPage vertical="buy" />} />
    <Route path="/rent" element={<VerticalListingPage vertical="rent" />} />
    <Route path="/new-projects" element={<VerticalListingPage vertical="new-projects" />} />
    <Route path="/commercial" element={<VerticalListingPage vertical="commercial" />} />
    <Route path="/land" element={<VerticalListingPage vertical="land" />} />
    <Route path="/mortgage" element={<MortgagePage />} />
    <Route path="/property/:propertySlug" element={<PropertyDetailPage />} />
    <Route path="/saved" element={<SavedPage />} />
    <Route path="/compare" element={<ComparePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
