import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegisterRoute from "./components/RegisterRoute";
import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/register' element={<RegisterRoute />} />
      <Route exact path='/login' element={<LoginRoute />} />
      <Route exact path='/' element={<HomeRoute />} />
    </Routes>
  </BrowserRouter>
);

export default App;
