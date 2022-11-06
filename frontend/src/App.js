import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPage from "./components/admin/AdminPage";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        
        <Route path="/admin" element={<AdminPage/>}>
        </Route>

        <Route path="/login" element={<Login/>}>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;