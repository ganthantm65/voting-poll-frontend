import { BrowserRouter, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { Route } from "lucide-react"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
