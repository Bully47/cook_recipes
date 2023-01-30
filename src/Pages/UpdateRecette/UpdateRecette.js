import React, { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { getDoc, doc } from "@firebase/firestore"
import { auth, db } from "../../Config/Firebase"
import UpdateRecetteForm from "../../Components/UpdateRecetteForm/UpdateRecetteForm"

import "./UpdateRecette.css"

function AddRecette() {
	const navigate = useNavigate()
	let { id } = useParams()
	const [user, loading, error] = useAuthState(auth)
	const [recette, setRecette] = useState({ ingredients: [], etapes: [] })

	const getRecette = async () => {
		const docSnap = await getDoc(doc(db, "Recettes", id))
		const fireRecette = docSnap.data()
		setRecette(fireRecette)
	}

	useEffect(() => {
		if (!user) return navigate("/login")
		getRecette()
	}, [])

	return (
		<div className="add_recette_page">
			<UpdateRecetteForm user={user} recette={recette} setRecette={setRecette} recetteID={id}/>

			<div className="update_recette_buttons">
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
