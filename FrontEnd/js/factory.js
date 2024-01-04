/* Fichier factory.js */

// Fonction pour créer une carte de travail (WORK CARD)
export function createWorkCard(work) {
  const article = document.createElement("article");
  article.classList.add("work");
  article.setAttribute("data-category", work.category.id);
  article.id = `work-${work.id}`

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
  const categoryElement = document.createElement("button");
  categoryElement.textContent = category.name;
  categoryElement.classList.add("categories-link");

  return categoryElement;
}