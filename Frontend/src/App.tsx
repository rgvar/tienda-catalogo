import { Topbar } from "./components/ui/Topbar/Topbar";
import { AppRouter } from "./routes/AppRouter"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

return (
    <div style={{backgroundColor: "whitesmoke"}}>
        <Topbar />
        <AppRouter />
    </div>
)
}

export default App
