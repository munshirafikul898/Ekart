import { Outlet, Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import  Home  from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import AddProduct from "./pages/admin/AddProduct";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProduct from "./pages/admin/AdminProduct";
import Sidebar from "./components/Sidebar";
import UserInfo from "./pages/admin/UserInfo";
import AddressForm from "./pages/AddressForm";
import OrderSuccess from "./pages/OrderSuccess";
import ShowUserOrders from "./pages/admin/ShowUserOrders";
import AdminSales from "./pages/admin/AdminSales";
import ForgotPassword from "./pages/ForgotPassword";


function App(){
  return(
    <>
      <Routes>
        <Route element={<Navbar/>} >
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:id" element={<SingleProduct/>} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/address" element={<ProtectedRoute><AddressForm/></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
        <Route element={<Sidebar/>} >
        <Route path="/dashboard/sales" element={<ProtectedRoute adminOnly={true}><AdminSales/></ProtectedRoute>} />
        <Route path="/dashboard/add-product" element={<ProtectedRoute adminOnly={true}><AddProduct/></ProtectedRoute>} />
        <Route path="/dashboard/users" element={<ProtectedRoute adminOnly={true}><AdminUsers/></ProtectedRoute>} />
        <Route path="/dashboard/users/:userId" element={<ProtectedRoute adminOnly={true}><UserInfo/></ProtectedRoute>} />
        <Route path="/dashboard/users/orders/:userId" element={<ProtectedRoute adminOnly={true}><ShowUserOrders/></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders/></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute adminOnly={true}><AdminProduct/></ProtectedRoute>} />
        </Route>
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/verify/:token" element={<VerifyEmail/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </>
  )
}
export default App;