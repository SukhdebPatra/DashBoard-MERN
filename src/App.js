
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';


function App() {
  return (

    <>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />

            <Route path='/update/:id' element={<UpdateProduct />} /> 

            
            <Route path='/logout' element={<h1>Logout product Component</h1>} />
             <Route path='/
          profile' element={<h1>Profile  Component</h1>} />

          </Route>


          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />



        </Routes>
      </BrowserRouter>
      <Footer />


    </>
  );
}

export default App;
