// Fonction pour créer une carte de travail (WORK CARD)
function createWorkCard(work) {
    const article = document.createElement('article'); 
    article.classList.add('work');
    article.setAttribute('data-category', work.category.id); 

    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const titleElement = document.createElement('p');
    titleElement.textContent = work.title;

    const categoryElement = document.createElement('p'); 
    categoryElement.textContent = work.category; 

    article.appendChild(imageElement);
    article.appendChild(titleElement);
    article.appendChild(categoryElement); 

    return article;
}

// Fonction pour récupérer les catégories uniques depuis les données des travaux
function getUniqueCategories(works) {
    const categoriesSet = new Set();
    works.forEach(work => {
      categoriesSet.add(work.category.name); // Assurez-vous que "work.category.name" correspond à la propriété où se trouvent les noms des catégories
    });
    return ['Tous', ...categoriesSet]; // Ajoutez 'Tous' à la liste des catégories uniques
  }

// Fonction pour créer des boutons catégories
async function createCategoryButtons(categories) {
    const categoryButtons = [];

    categories.forEach(category => {
        const categoryElement = document.createElement('a');
        categoryElement.textContent = category.name;
        categoryElement.href = '#';
        categoryElement.classList.add('categories-link'); 
        categoryElement.addEventListener('click', () => filterWorksByCategory(category));

        categoryButtons.push(categoryElement);
    });

    return categoryButtons;
}

// Fonction de filtrage des travaux par catégorie
async function filterWorksByCategory(category) {
  console.log('Catégorie sélectionnée :', category); // Affiche la catégorie sélectionnée
  const gallery = document.querySelector('.gallery');
  const works = document.querySelectorAll('.work');

  works.forEach(work => {
    const workCategory = parseInt(work.dataset.categoryId);
    console.log('Catégorie du travail :', workCategory); // Affiche le categoryId du travail
    if (category.name === 'Tous' || workCategory === category.id) {
      work.style.display = 'block';
      } else {
        work.style.display = 'none';
      }
  });
}




