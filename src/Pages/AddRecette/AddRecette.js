import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import AddRecetteForm from "../../Components/AddRecetteForm/AddRecetteForm"
import { auth } from "../../Config/Firebase"

import "./AddRecette.css"

function AddRecette() {
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) return navigate("/login")
	}, [])

	return (
		<div className="add_recette_page">
			<AddRecetteForm user={user} />

			<div className="add_recette_buttons">
				<Link to="/recettes" className="blue_btn">
					Liste des Recettes
				</Link>
				<Link to="/" className="blue_btn">
					Accueil
				</Link>
			</div>
		</div>
	)
}

export default AddRecette
