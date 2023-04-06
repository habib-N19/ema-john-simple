import React from 'react'
import Header from '../Header/Header'
import '../../components/Header/Header.css'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}

export default Home
