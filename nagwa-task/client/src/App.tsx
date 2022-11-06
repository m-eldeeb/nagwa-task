import { Route, Routes } from "react-router-dom";
import PracticeScreen from "./pages/PracticeScreen";
import RankScreen from "./pages/RankScreen";

function App() {
  return (
    <>
    {/** 
     * We have 2 routes in app [practice screen -- rank scrern] 
     * use [Routes] to wrapp all routes
     * use [Route] for each path we need to set 
     * [page-not-found] for wrong path
    
    */}
      <Routes>
        <Route path="/" element={<PracticeScreen />} />
        <Route path="score/:score" element={<RankScreen />} />
        <Route path="*" element={<h1 className="page__not__found">page not found</h1>} />
      </Routes>

      
    </>
  );
}

export default App;
