import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/dashboard/dashboard";
import PostProvider from "./components/postProvider/postProvider";
import UpdateProvider from "./components/updateProvider/updateProvider";
import NoMatch from "./components/nonmatch/noMatch";
import Header from "./components/header/header";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/provider" element={<PostProvider></PostProvider>}></Route>
        <Route path="/provider/:id" element={<UpdateProvider></UpdateProvider>}></Route>
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </>
  );
}

export default App;
