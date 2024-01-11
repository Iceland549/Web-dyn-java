/* Fichier home.js */

import { fetchWorks, fetchCategories } from "./api.js";
import { createWorkCard, createCategoryButtons } from "./factory.js";

export { displayGallery };


// Fonction pour afficher les images de la galerie
async function displayGallery() {
  try {

    const works = await fetchWorks();
    const gallery = document.querySelector(".gallery");

    works.forEach((work) => {
      const workElement = createWorkCard(work);
      gallery.appendChild(workElement);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la galerie :", error);
  }
}

// Fonction filtrage des travaux et met à jour
function filterWorksByCategory(category, index) {
  const works = document.querySelectorAll(".work");
  const links = document.querySelectorAll(".categories-link");

  works.forEach((work) => {
    const workCategoryId = Number(work.dataset.category);
    work.style.display =
      category.name === "Tous" || workCategoryId === category.id
        ? "block"
        : "none";
  });

  links.forEach((link, i) => {
    if (i === index) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Attente de chargement complet du DOM avant d'exécuter le code
document.addEventListener("DOMContentLoaded", async () => {
  await displayGallery();
  let categories = await fetchCategories();
  categories = [{ id: null, name: "Tous" }, ...categories];
  const categoriesContainer = document.querySelector(".categories");
  categories.forEach((category, index) => {
    const categoryElement = createCategoryButtons(category);
    categoriesContainer.appendChild(categoryElement);
    categoryElement.addEventListener("click", () => {
      filterWorksByCategory(category, index);
    });
    if (category.name === "Tous") {
      categoryElement.classList.add("active");
    }
  });
  isAdmin();
});

// Fonction pour vérifier si l'utilisateur est un administrateur
function isAdmin() {
  if (window.localStorage.getItem("token")) {
    document.querySelector(".categories").style.display = "none";
    document.querySelector("#info-bar").style.display = "flex";
    document.querySelector("#editLink").style.display = "block";
    const login = document.getElementById("login");
    login.innerText = "logout";
    login.href = "#";
    login.addEventListener("click", () => {
      window.localStorage.clear();
      window.location.reload();
    });
  }
}