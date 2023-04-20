import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './components/Header/Header.css'
import Shop from './components/Shop/Shop'
import Home from './components/Layout/Home'
import Orders from './components/Orders/Orders'
import Inventory from './components/Inventory/Inventory'
import Login from './components/Login/Login'
import cartProductsLoader from './loaders/cardProductsLoader'
import Checkout from './components/Checkout/Checkout'
import SignUp from './components/SignUp/SignUp'
import AuthProvider from './components/providers/AuthProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'inventory',
        element: <Inventory></Inventory>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {' '}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
