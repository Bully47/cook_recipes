import React from "react"
import { Routes, Route } from "react-router-dom"

import Sidebar from "./Components/Sidebar/Sidebar"

import Error404 from "./Pages/NoMatch/Error404"
import Home from "./Pages/Home/Home"
import AddRecette from "./Pages/AddRecette/AddRecette"
import UpdateRecette from "./Pages/UpdateRecette/UpdateRecette"
import Recettes from "./Pages/Recettes/Recettes"
import Recette from "./Pages/Recette/Recette"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Reset from "./Pages/Reset/Reset"
import Dashboard from "./Pages/Dashboard/Dashboard"

import "./App.css"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Sidebar />}>
					<Route index element={<Home />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/reset" element={<Reset />} />
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/addRecette" element={<AddRecette />} />
					<Route exact path="/recettes" element={<Recettes />} />
					<Route exact path="/recette/:id" element={<Recette />} />
					<Route exact path="/updateRecette/:id" element={<UpdateRecette />} />
					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
