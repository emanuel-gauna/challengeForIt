import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";


function App() {
    return(
        <h1>Hola Mundo!</h1>
       /*  <Router>
            <div>
                <h1>Task Manager</h1>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/new-task" element={<TaskForm />} />
                    <Route path="/task/edit/:id" element={<TaskForm/>} />
                </Routes>
            </div>
        </Router> */
    );
}

export default App;