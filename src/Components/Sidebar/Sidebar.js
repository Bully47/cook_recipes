import React, { useState } from "react"
import { Outlet, Link } from "react-router-dom"

import "./Sidebar.css"

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className={`sidebar ${isOpen ? "open" : ""}`}>
				<div className="sidebar_content">
					<nav>
						<Link onClick={() => setIsOpen(false)} to="/">
							Accueil
						</Link>
						<Link onClick={() => setIsOpen(false)} to="/dashboard">
							Dashboard
						</Link>
						<Link onClick={() => setIsOpen(false)} to="/recettes">
							Liste des Recettes
						</Link>
						<Link onClick={() => setIsOpen(false)} to="/addRecette">
							Nouvelle Recette
						</Link>
						<Link onClick={() => setIsOpen(false)} to="/Erreur_404">
							Erreur 404
						</Link>
					</nav>
				</div>
			</div>
			<span
				onClick={() => setIsOpen(!isOpen)}
				className={isOpen ? "open_button clicked" : "open_button"}
			></span>
			<Outlet />
		</>
	)
}

export default Sidebar
