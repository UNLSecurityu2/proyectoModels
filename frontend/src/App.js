import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Events from "./pages/Events";
import AddUser from "./pages/AddUser";
import EditarUsuario from "./pages/EditarUsuario";
import AddEvents from "./pages/AddEvents";
import EditEvents from "./pages/EditEvents";
import Teams from "./pages/Teams";
import EditarTeam from "./pages/EditarTeams";
import AddTeam from "./pages/AddTeams";
import Categorys from "./pages/Categorys";
import EditarCategorys from "./pages/EditarCategorys";
import AddCategorys from "./pages/AddCategorys";


function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditarUsuario/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/events/add" element={<AddEvents/>}/>
        <Route path="/events/edit/:id" element={<EditEvents/>}/>
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/teams/add" element={<AddTeam/>}/>
        <Route path="/teams/edit/:id" element={<EditarTeam/>}/>
        <Route path="/categorys" element={<Categorys/>}/>
        <Route path="/categorys/add" element={<AddCategorys/>}/>
        <Route path="/categorys/edit/:id" element={<EditarCategorys/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
