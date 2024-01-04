/* api.js */

// Exportation des fonctions pour une utilisation dans d’autres modules
export { loginUser, fetchWorks, fetchCategories, deleteWork, addPhoto };

// Récupération des travaux depuis l’API
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();

  return works;
}

// Récupération des catégories depuis l’API
async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  return categories;
}

// Connexion de l’utilisateur via l’API
async function loginUser(email, password) {
  // Effectue une requête POST vers le backend pour la connexion
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // Vérifie si la réponse est valide et retourne les données
  if (!res.ok) {
    throw new Error("Erreur de connexion");
  }

  const log = await res.json();
  return log;
}

// Fonction pour supprimer des photos
async function deleteWork(id) {
  const res = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur de suppression");
  }
  return id;
}

// Fonction pour ajouter une photo
async function addPhoto(photoData) {
  try {
    // Vérification du token
    const token = window.localStorage.getItem("token");
    console.log("Token récupéré:", token);

    if (!token) {
      throw new Error("Token manquant");
    }
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: photoData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la photo");
    }

    const newWork = await response.json();
    console.log("Nouveau travail ajouté :", newWork);
    return newWork;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la photo :", error);
    throw error;
  }
}
