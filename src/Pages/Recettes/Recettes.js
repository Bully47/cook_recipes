import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore"
import { db, auth } from "../../Config/Firebase"

import "./Recettes.css"

function Recettes() {
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()
	const [recettes, setRecettes] = useState([])
	const getRecettes = async () => {
		await getDocs(collection(db, "Recettes")).then((querySnapshot) => {
			const fireRecettes = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			setRecettes(fireRecettes)
		})
	}

	// const deleteRecette = async (id) => {
	// 	await deleteDoc(doc(db, "Recettes", id))
	// 	getRecettes()
	// }

	useEffect(() => {
		if (!user) return navigate("/login")
		getRecettes()
	}, [])

	return (
		<div className="recettes_page">
			<div className="recettes_cards_container">
				{recettes.map((recette) => (
					<div key={recette.id} className="recettes_card">
						<img
							className="recettes_card_image"
							src={recette.image}
							alt={recette.titre}
						/>
						<p className="recettes_card_titre">{recette.titre}</p>
						<p className="recettes_card_categorie">{recette.categorie}</p>
						<div className="recettes_card_ingredients_container">
							{recette.ingredients.map((ingredient) => (
								<span key={ingredient} className="recettes_card_ingredient_tag">
									{ingredient}
								</span>
							))}
						</div>
						<p className="recettes_card_user">Ajouté par:{recette.userName}</p>

						<div className="recettes_buttons_group">
							<Link to={`/recette/${recette.id}`} className="blue_btn">
								Afficher
							</Link>
						</div>
					</div>
				))}
			</div>
			<div
				class="floating_button"
				onClick={() => navigate("/addRecette")}
			></div>
		</div>
	)
}

export default Recettes
