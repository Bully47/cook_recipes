import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, db, logout } from "../../Config/Firebase"
import {
	query,
	collection,
	getDocs,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore"
import { Link } from "react-router-dom"

import "./Dashboard.css"

function Dashboard() {
	const [user, loading, error] = useAuthState(auth)
	const [name, setName] = useState("")
	const [userRecettes, setUserRecettes] = useState([])
	const navigate = useNavigate()
	const fetchUserName = async () => {
		try {
			const q = query(collection(db, "users"), where("uid", "==", user?.uid))
			const doc = await getDocs(q)
			const data = doc.docs[0].data()
			setName(data.name)
		} catch (err) {
			console.error(err)
			alert("An error occured while fetching user data")
		}
	}
	const getUserRecettes = async () => {
		const q = query(collection(db, "Recettes"), where("userID", "==", user.uid))

		await getDocs(q).then((querySnapshot) => {
			const fireRecettes = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			setUserRecettes(fireRecettes)
		})
	}

	const deleteRecette = async (id) => {
		await deleteDoc(doc(db, "Recettes", id))
		getUserRecettes()
	}
	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getUserRecettes()
		fetchUserName()
	}, [user, loading])
	return (
		<div className="dashboard_page">
			<div className="dashboard_container">
				Connecté en tant que :<div>{name}</div>
				<div>{user?.email}</div>
				<div className="dashboard_recettes">
					{userRecettes.map((recette) => (
						<div key={recette.id} className="dashboard_recette_card">
							<img
								className="dashboard_recette_card_image"
								src={recette.image}
								alt={recette.titre}
							/>
							<p className="dashboard_recette_card_titre">{recette.titre}</p>
							<p className="dashboard_recette_card_categorie">
								{recette.categorie}
							</p>
							<div className="dashboard_recette_card_buttons_group">
								<Link to={`/recette/${recette.id}`} className="blue_btn">
									Afficher
								</Link>
								<Link to={`/updateRecette/${recette.id}`} className="blue_btn">
									Modifier
								</Link>
								<button
									onClick={() => deleteRecette(recette.id)}
									className="blue_btn"
								>
									Supprimer
								</button>
							</div>
						</div>
					))}
				</div>
				<div>
					<button className="blue_btn" onClick={logout}>
						Déconnexion
					</button>
					<Link to={`/recettes`} className="blue_btn">
						Toutes les Recettes
					</Link>
				</div>
			</div>
		</div>
	)
}
export default Dashboard
