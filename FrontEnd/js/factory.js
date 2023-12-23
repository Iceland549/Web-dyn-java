/* Fichier factory.js */

// Fonction pour créer une carte de travail (WORK CARD)
export function createWorkCard(work) {
  const article = document.createElement("article");
  article.classList.add("work");
  article.setAttribute("data-category", work.category.id);

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;

  const titleElement = document.createElement("p");
  titleElement.textContent = work.title;

  article.appendChild(imageElement);
  article.appendChild(titleElement);

  return article;
}

// Fonction pour créer des boutons catégories
export function createCategoryButtons(category) {
  const categoryElement = document.createElement("a");
  categoryElement.textContent = category.name;
  categoryElement.href = "#";
  categoryElement.classList.add("categories-link");

  return categoryElement;
}

/*
export function updateCategory(index) {
  const links = document.querySelectorAll(".categories-link");

  // Mettre à jour la sélection visuelle des liens
  links.forEach((link, i) => {
    if (i === index) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Fonction de filtrage des travaux par catégorie
export function filterWorksByCategory(category) {
  console.log("Catégorie sélectionnée :", category);
  const gallery = document.querySelector(".gallery");
  const works = document.querySelectorAll(".work");

  works.forEach((work) => {
    const workCategory = parseInt(work.dataset.categoryId);
    console.log("Catégorie du travail :", workCategory);
    if (category.name === "Tous" || workCategory === category.id) {
      work.style.display = "block";
    } else {
      work.style.display = "none";
    }
  });
}
*/