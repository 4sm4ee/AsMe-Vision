import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Navbarlogin from "./Navbarlogin";
import Section from "./section";
import Upload from "./ai_analyze";
import Gallery from "./Gallery";
export function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export function UploadLayout() {
  return (
    <>
      <Navbarlogin />
      <Outlet />
    </>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Section />} />
        </Route>
        <Route element={<UploadLayout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/gallery" element={<Gallery/>}/>
        </Route>
      </Routes>
    </Router>
  );
}