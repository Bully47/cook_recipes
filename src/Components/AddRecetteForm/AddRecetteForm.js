import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "@firebase/firestore"

import { db } from "../../Config/Firebase"

import "./AddRecetteForm.css"

function AddRecetteForm({ user }) {
	const navigate = useNavigate()
	const [ingredients, setIngredients] = useState([])
	const [etapes, setEtapes] = useState([])
	const [newIngredient, setNewIngredient] = useState("")
	const [newEtape, setNewEtape] = useState("")
	const [nouvelleRecette, setNouvelleRecette] = useState({
		titre: "",
		categorie: "",
		image: "https://picsum.photos/200",
		userName: user.displayName,
		userID: user.uid,
		ingredients: [],
		etapes: [],
	})

	const handleSubmit = (e) => {
		try {
			addDoc(collection(db, "Recettes"), nouvelleRecette)
		} catch (err) {
			console.log(err)
		}
		navigate("/recettes")
		e.preventDefault()
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setNouvelleRecette({ ...nouvelleRecette, [name]: value })
	}

	const handleAddIngredient = (e) => {
		e.preventDefault()
		setIngredients([...ingredients, newIngredient])
		setNouvelleRecette({
			...nouvelleRecette,
			ingredients: [...ingredients, newIngredient],
		})
		setNewIngredient("")
	}

	const handleRemoveIngredient = (index) => {
		const updatedIngredients = [...ingredients]
		updatedIngredients.splice(index, 1)
		setIngredients(updatedIngredients)
		setNouvelleRecette({ ...nouvelleRecette, ingredients: updatedIngredients })
	}

	const handleAddEtape = (e) => {
		e.preventDefault()
		setEtapes([...etapes, newEtape])
		setNouvelleRecette({ ...nouvelleRecette, etapes: [...etapes, newEtape] })
		setNewEtape("")
	}

	const handleRemoveEtape = (index) => {
		const updatedEtapes = [...etapes]
		updatedEtapes.splice(index, 1)
		setEtapes(updatedEtapes)
		setNouvelleRecette({ ...nouvelleRecette, etapes: updatedEtapes })
	}

	return (
		<>
			<div className="add_recette_form">
				<input
					type="text"
					placeholder="Titre"
					name="titre"
					value={nouvelleRecette.titre}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Catégorie"
					name="categorie"
					value={nouvelleRecette.categorie}
					onChange={handleChange}
				/>

				<div className="ingredients_container">
					<form onSubmit={handleAddIngredient} className="ingredients_form">
						<label className="ingredients_label">
							Ajouter un ingrédient :
							<input
								type="text"
								value={newIngredient}
								onChange={(e) => setNewIngredient(e.target.value)}
								className="ingredients_input"
							/>
						</label>
						<button type="submit" className="blue_btn">
							Ajouter
						</button>
					</form>

					<div className="ingredients_list">
						{ingredients.map((ingredient, index) => (
							<span
								key={index}
								className="ingredient_tag"
								onClick={() => handleRemoveIngredient(index)}
							>
								{ingredient}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="trash_icon"
									viewBox="0 0 16 16"
								>
									{" "}
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
									<path
										fill-rule="evenodd"
										d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
									/>{" "}
								</svg>
							</span>
						))}
					</div>
				</div>

				<div className="etapes_container">
					<form onSubmit={handleAddEtape} className="etapes_form">
						<label className="etapes_label">
							Ajouter une étape :
							<input
								type="text"
								value={newEtape}
								onChange={(e) => setNewEtape(e.target.value)}
								className="etapes_input"
							/>
						</label>
						<button type="submit" className="blue_btn">
							Ajouter
						</button>
					</form>

					<div className="etapes_list">
						{etapes.map((etape, index) => (
							<span
								key={index}
								className="etape_tag"
								onClick={() => handleRemoveEtape(index)}
							>
								{etape}{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="trash_icon"
									viewBox="0 0 16 16"
								>
									{" "}
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
									<path
										fill-rule="evenodd"
										d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
									/>{" "}
								</svg>
							</span>
						))}
					</div>
				</div>
				<div>
					<button className="blue_btn" type="button" onClick={() => navigate(-1)}>
						Annuler
					</button>
					<button className="blue_btn" type="button" onClick={handleSubmit}>
						Ajouter
					</button>
				</div>
			</div>
		</>
	)
}

export default AddRecetteForm
