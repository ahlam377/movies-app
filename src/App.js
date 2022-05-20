import { MainContainer } from "./Global.Styles";
import Nav from "./Components/Nav/Nav";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import MovieScreen from "./Screen/MovieScreen/MovieScreen";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <MainContainer>
      <Nav />
      <Routes>
        <Route path={"/"} element={ <HomeScreen />}/>
        <Route path={"/movies/:id"} element={<MovieScreen />}/>
      </Routes>
    </MainContainer>
  );
}

export default App;
