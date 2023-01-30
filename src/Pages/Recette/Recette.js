import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc } from "@firebase/firestore"
import { db, auth } from "../../Config/Firebase"

import "./Recette.css"

function Recette() {
	const navigate = useNavigate()
	let { id } = useParams()
	const [user, loading, error] = useAuthState(auth);
	const [recette, setRecette] = useState({ ingredients: [], etapes: [] })
	const getRecette = async () => {
		const docSnap = await getDoc(doc(db, "Recettes", id))
		const fireRecette = docSnap.data()
		setRecette(fireRecette)
	}

	useEffect(() => {
		if (!user) return navigate("/login");
		getRecette()
	}, {})

	return (
		<div className="recette_page">
			<div className="recette_container">
				<div key={recette.id} className="recette_full_card">
					<img src={recette.image} alt={recette.titre}  className="recette_full_card_image"/>
					<p className="recette_full_card_titre">{recette.titre}</p>
					<p className="recette_full_card_categorie">{recette.categorie}</p>
					<p  className="recette_full_card_username">Ajouté par : {recette.userName}</p>

					<div className="recette_full_card_ingredients_container">
						{recette.ingredients.map((ingredient) => (
							<span key={ingredient} className="recette_full_card_ingredient_tag">{ingredient}</span>
						))}
					</div>

					<div className="recette_full_card_etapes_container">
						{recette.etapes.map((etape) => (
							<p className="recette_full_card_etapes_tag">{etape}</p>
						))}
					</div>


					<div className="recette_full_cards_buttons_group">
						<Link to={`/recettes`} className="blue_btn">
							Liste des Recettes
						</Link>
						{user.uid == recette.userID ? <Link to={`/updateRecette/${id}`} className="blue_btn">Modifier</Link> : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Recette
