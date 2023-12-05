// Récupération des pièces éventuellement stockées dans le localStorage
let works = window.localStorage.getItem('works'); // Récupère les données 'works' du localStorage
let categories = window.localStorage.getItem('categories'); // Récupère les données 'categories' du localStorage

// Vérifie si les données 'works' sont déjà stockées localement, sinon les récupère depuis l'API
if (works === null) {
    const response = await fetch('http://localhost:5678/api/works'); // Effectue une requête GET vers l'API pour récupérer les données 'works'
    works = await response.json(); // Transforme la réponse en JSON
    const valeurWorks = JSON.stringify(works); // Convertit les données 'works' en chaîne JSON
    window.localStorage.setItem("works", valeurWorks); // Stocke les données 'works' dans le localStorage
} else {
    works = JSON.parse(works); // Si les données 'works' sont déjà présentes dans le localStorage, les transforme en objet JavaScript
}

// Vérifie si les données 'categories' sont déjà stockées localement, sinon les récupère depuis l'API
if (categories === null) {
    const response = await fetch('http://localhost:5678/api/categories'); // Effectue une requête GET vers l'API pour récupérer les données 'categories'
    categories = await response.json(); // Transforme la réponse en JSON
    const valeurCategories = JSON.stringify(categories); // Convertit les données 'categories' en chaîne JSON
    window.localStorage.setItem("categories", valeurCategories); // Stocke les données 'categories' dans le localStorage
} else {
    categories = JSON.parse(categories); // Si les données 'categories' sont déjà présentes dans le localStorage, les transforme en objet JavaScript
}

