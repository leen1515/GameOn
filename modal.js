function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//issue 1

// déclencher la fermeture du formulaire
//selectionner et enregistrer le bouton close dans la constante
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", fermerFormulaire);

// fermer le formulaire
function fermerFormulaire() {
  modalbg.style.display = "none";
}


//issue 2 la gestion du formulaire

  //la date de naissance ne doit pas ultérieur à la date ou l'utilisateur utilise le formulaire
  const date = new Date()//vérification de la date de naissance à partir du jour actuel
  const anneeActuelle = date.getFullYear();//récupération de l'année actuelle
  const moisActuel = date.getMonth()+1;//ajout du +1 pour un rendu exact du mois, celui-ci comptabilisé à partir de 0.
  const jourActuel = date.getDate();//renvoit le jour du mois.
  //vérification de la date de naissance avec la date actuelle. Avec l'ajout de l'attribut. La personne ne dois pas être née dans le futur.
  //ajout du 0 avant le chiffre et le slice(-2) pour limiter le rendu à deux chiffres pour que l'attribut max prenne en compte le format.
  document.forms.reserve.birthdate.max = anneeActuelle+"-"+("0"+moisActuel).slice(-2)+"-"+("0"+jourActuel).slice(-2);

function validate(anneeActuelle) {
  //récupération des valeurs des champs du formulaire
  const inputPrenom = document.forms.reserve.first.value;
  const inputNom = document.forms.reserve.last.value;
  const inputEmail = document.forms.reserve.email.value;
  const inputTournoiQuantite = document.forms.reserve.quantity.value;
  const inputLocation = document.forms.reserve.location.value;

  //vérification de l'alphabet, de a-A jusqu'à z-Z pour le prénom et le nom
  const verifAlpha = /^[a-zA-Z]+$/;

  if (!verifAlpha.test(inputPrenom) || inputPrenom == "") {
    alert('Le prenom ne peut être vide et les lettres alphabets sont seuls à être autorisées');
    inputPrenom.focus;
    return false;
  }
  if (!verifAlpha.test(inputNom) || inputNom == "") {
    alert('Le nom ne peut être vide et les lettres alphabets sont seuls à être autorisées');
    inputNom.focus;
    return false;
  }
  //deuxième vérification pour l'email
  if (inputEmail == "") {
    alert('entrez un email valide');
    inputEmail.focus;
    return false;
  }

  if (isNaN(inputTournoiQuantite) == true){
    alert('Les nombres sont seuls à être acceptés')
  }


return true;


}