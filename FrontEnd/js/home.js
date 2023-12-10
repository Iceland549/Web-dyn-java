
// Fonction de récupération des données 'works' (localStorage ou API)
async function fetchWorks() {
    let works = window.localStorage.getItem('works'); // Récupère les données 'works' du localStorage
    if (works === null) {
        const response = await fetch('http://localhost:5678/api/works'); // Effectue une requête GET vers l'API pour récupérer les données 'works'
        works = await response.json(); // Transforme la réponse en JSON
        const valeurWorks = JSON.stringify(works); // Convertit les données 'works' en chaîne JSON
        window.localStorage.setItem("works", valeurWorks); // Stocke les données 'works' dans le localStorage
    } else {
        works = JSON.parse(works); // Si les données 'works' sont déjà présentes dans le localStorage, les transforme en objet JavaScript
    }
    return works;
}

// Fonction de récupération des données 'works' (localStorage ou API)
async function fetchCategories() {
    let categories = window.localStorage.getItem('categories'); // Récupère les données 'categories' du localStorage
    if (categories === null) {
        const response = await fetch('http://localhost:5678/api/categories'); // Effectue une requête GET vers l'API pour récupérer les données 'categories'
        categories = await response.json(); // Transforme la réponse en JSON
        categories.unshift({ id: 0, name: 'Tous' }); // Ajout du lien "Tous" au début des catégories
        const valeurCategories = JSON.stringify(categories); // Convertit les données 'categories' en chaîne JSON
        window.localStorage.setItem("categories", valeurCategories); // Stocke les données 'categories' dans le localStorage
    } else {
        categories = JSON.parse(categories); // Si les données 'categories' sont déjà présentes dans le localStorage, les transforme en objet JavaScript
    }
    return categories;
}

// Fonction pour afficher les images de la galerie
async function displayGallery() {
    const works = await fetchWorks();
  
    // Boucle sur les données pour afficher les images dans la galerie (ajuste la structure HTML)
    const gallery = document.querySelector('.gallery');
  
    works.forEach(work => {

      const workElement = document.createElement('div');
      workElement.classList.add('work');

      const imageElement = document.createElement('img');
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;

      // Création d'un titre pour chaque travail
      const titleElement = document.createElement('p');
      titleElement.textContent = work.title; // Utilisation du titre du travail

      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement); 

      gallery.appendChild(workElement); // Ajout du titre au DOM

    });
      // Sélection du premier élément <p> à l'intérieur du premier '.work' dans la galerie
    const firstTitleElement = document.querySelector('.gallery .work:nth-child(1) p');
    // Modification du texte du premier élément
    firstTitleElement.textContent = "Abat-jour Tahina";

    // Sélection du quatrième élément <p> à l'intérieur du quatrième '.work' dans la galerie
    const fourthTitleElement = document.querySelector('.gallery .work:nth-child(4) p');
    // Modification du texte du quatrième élément
    fourthTitleElement.textContent = "Villa “La Balisière” - Port-Louis";

    // Sélection du onzième élément <p> à l'intérieur du onzième '.work' dans la galerie
    const eleventhTitleElement = document.querySelector('.gallery .work:nth-child(11) p');
    // Modification du texte du onzième élément
    eleventhTitleElement.textContent = "Hôtel First Arte - New Delhi";

  }
  
document.addEventListener('DOMContentLoaded', async () => {
    await displayGallery();
    const categories = await fetchCategories();
    const categoryButtons = await createCategoryButtons(categories);

    categoryButtons.forEach(button => {
        document.querySelector('.categories').appendChild(button);
    });

});



