/* api.js */

// Exportation des fonctions pour une utilisation dans d’autres modules
export { loginUser, fetchWorks, fetchCategories, deleteWork };

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

async function deleteWork(id) {
  const res = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization : `Bearer ${window.localStorage.getItem('token')}`
     },
  });

  if (!res.ok) {
    throw new Error("Erreur de suppression");
  }
  return id;
}
