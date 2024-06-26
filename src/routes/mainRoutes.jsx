import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*------ Pages-----*/
import SignIn from "../Pages/SignIn";
// import Service from "./../pages/Service1";
import NotFound from "../Pages/404";
import Devices from "../Pages/Devices";
import AddDevice from "../Pages/AddDevice";
import ProtectedRoutes from "./../components/common/routes/protectedRoute";
import BulkUpload from "../Pages/BulkUpload";
import Home from "../Pages/Home";
import ViewDevice from "../Pages/ViewDevice";
import UpdateDevice from "../Pages/UpdateDevice";
import ScanDevice from "../Pages/ScanDevice"
import GenerateBarcode from "../Pages/GenerateBarcode"
const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/addDevice" element={<AddDevice />} />
          <Route path="/devices/bulkUpload" element={<BulkUpload />} />
          <Route path="/devices/viewDevice/:id" element={<ViewDevice />} />
          <Route path="/devices/updateDevice/:id" element={<UpdateDevice />} />
          <Route path="/devices/scan" element={<ScanDevice />} />
          <Route path="/devices/generateBarcode" element={<GenerateBarcode />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
