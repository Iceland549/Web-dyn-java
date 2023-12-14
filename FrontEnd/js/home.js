// Home.js //
// Fonction de récupération des données 'works' (localStorage ou API)
async function fetchWorks() {
    let works = window.localStorage.getItem('works'); 
    if (works === null) {
        const response = await fetch('http://localhost:5678/api/works'); 
        works = await response.json(); 
        const valeurWorks = JSON.stringify(works); 
        window.localStorage.setItem("works", valeurWorks); 
    } else {
        works = JSON.parse(works); 
    }
    return works;
}

// Fonction de récupération des données 'works' (localStorage ou API)
async function fetchCategories() {
    let categories = window.localStorage.getItem('categories'); 
    if (categories === null) {
        const response = await fetch('http://localhost:5678/api/categories'); 
        categories = await response.json(); 

        categories.unshift({ id: 0, name: 'Tous' }); 
        const valeurCategories = JSON.stringify(categories); 
        window.localStorage.setItem("categories", valeurCategories);  
    } else {
        categories = JSON.parse(categories);  
    }
    return categories;
}

// Fonction pour afficher les images de la galerie
async function displayGallery() {
    const works = await fetchWorks();
    const gallery = document.querySelector('.gallery');
  
    works.forEach(work => {

      const workElement = document.createElement('div');
      workElement.classList.add('work');
      workElement.dataset.categoryId = work.category.id;

      const imageElement = document.createElement('img');
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;

      const titleElement = document.createElement('p');
      titleElement.textContent = work.title;  

      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement); 

      gallery.appendChild(workElement);  

    });
    const firstTitleElement = document.querySelector('.gallery .work:nth-child(1) p');
    firstTitleElement.textContent = "Abat-jour Tahina";

    const fourthTitleElement = document.querySelector('.gallery .work:nth-child(4) p');
    fourthTitleElement.textContent = "Villa “La Balisière” - Port-Louis";

    const eleventhTitleElement = document.querySelector('.gallery .work:nth-child(11) p');
    eleventhTitleElement.textContent = "Hôtel First Arte - New Delhi";

}

// Attente de chargement complet du DOM avant d'exécuter le code
document.addEventListener('DOMContentLoaded', async () => {
    await displayGallery();
    const categories = await fetchCategories();
    const categoryButtons = await createCategoryButtons(categories);

    categoryButtons.forEach(button => {
        document.querySelector('.categories').appendChild(button);
    });

});

