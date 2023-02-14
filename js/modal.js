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
modalBtn.forEach((btn) => btn.addEventListener("click", lancerFormulaire));

// launch modal form
function lancerFormulaire() {
  modalbg.style.display = "block";
}

// fermer le formulaire
function fermerFormulaire() {
  modalbg.style.display = "none";
}
// déclencher la fermeture du formulaire
//selectionner et enregistrer le bouton close dans la constante
const boutonFermer = document.querySelector(".close");

boutonFermer.addEventListener("click", fermerFormulaire);

const formulaireValidation = document.getElementById("valider");

//la date de naissance ne doit pas ultérieur à la date ou l'utilisateur utilise le formulaire
const date = new Date(); //vérification de la date de naissance à partir du jour actuel
const anneeActuelle = date.getFullYear(); //récupération de l'année actuelle
const moisActuel = date.getMonth() + 1; //ajout du +1 pour un rendu exact du mois, celui-ci comptabilisé à partir de 0.
const jourActuel = date.getDate(); //renvoit le jour du mois.
//vérification de la date de naissance avec la date actuelle. Avec l'ajout de l'attribut. La personne ne dois pas être née dans le futur.
//ajout du 0 avant le chiffre et le slice(-2) pour limiter le rendu à deux chiffres pour que l'attribut max prenne en compte le format.
document.forms.reserve.birthdate.max =
  anneeActuelle +
  "-" +
  ("0" + moisActuel).slice(-2) +
  "-" +
  ("0" + jourActuel).slice(-2);

function valider(event) {
  const prenom = document.querySelector("#first"); //selection des id correspondant au champs
  const nom = document.querySelector("#last");
  const email = document.querySelector("#email");
  const naissance = document.querySelector("#birthdate");
  const nbrTournoi = document.querySelector("#quantity");
  const location = document.getElementsByName("location");
  const condition = document.getElementsByName("condition");
  const enregistre = document.getElementsByName("enregistre");

  event.preventDefault(); // stoppe les fonctionnalités par défaut de l'evenement du click
  verificationChamps(
    prenom,
    nom,
    email,
    naissance,
    nbrTournoi,
    location,
    condition,
    enregistre
  ); //récuperer les variables en argument de la fonction *verificationChamps appellée
}

function verificationChamps(
  prenom,
  nom,
  email,
  naissance,
  nbrTournoi,
  location,
  condition,
  enregistre
) {
  let prenomValeur = prenom.value.trim(); //efface les espace avant et après la valeur
  let nomValeur = nom.value.trim(); //les variables sont en let car elles sont mis à jour avec le *toString qui va suivre
  let emailValeur = email.value.trim();
  let naissanceValeur = naissance.value.trim();
  const nbrTournoiValeur = parseInt(nbrTournoi.value); // pour bien s'assurer que la valeur ne retournera que des entiers
  const locationPourAttribut = document.querySelector("#location1");
  const conditionPourAttribut = document.querySelector("#checkbox1");
  let cocherChamps = "";
  let selectCondition = "";
  let selectEnregistrer = "";

  //une boucle pour parcourir tous les balises inputs dont le name est sur *location pour gerer les types radio et leur selection
  for (let radio of location) {
    if (radio.checked) {
      cocherChamps = radio.value;
    } // si l'élément est coché, la valeur de value devient celle de la nouvelle variable : *locationChamps
  }

  for (let cocherCondition of condition) {
    if (cocherCondition.checked) {
      selectCondition = cocherCondition.value;
    } // si l'élément est coché, la valeur de value devient celle de la nouvelle variable : *selectCondition
  }

  for (let cocherEnregistrer of enregistre) {
    if (cocherEnregistrer.checked) {
      selectEnregistrer = cocherEnregistrer.value;
    } // si l'élément est coché, la valeur de value devient celle de la nouvelle variable : *selectEnregistrer
  }

  nomValeur = nomValeur.toString(); //met à jour la variable en la transformant en *string
  prenomValeur = prenomValeur.toString();
  emailValeur = emailValeur.toString();

  //utilisation de switch pour comparer les valeurs les conditions et déclencher les fonctionnalités
  let pasValide = 0; //je déclare un compteur qui va s'incrémenter à chaque erreur, à l'exterieur du switch pour une large portée de la variable
  let averti = false; // je declare une variable a valeur booleenne, elle sera modifier par le switch si l'utilisateur accepte d'etre averti

  //filtrer le champ prenom
  switch (true) {
    case prenomValeur === "": //dans le cas ou le champ *prenom est vide
      erreurEvenement(prenom, "Tous les champs sont obligatoires"); //on appelle la fonction *erreurEvenement avec en argument la variable de l'id du champ prenom
      pasValide++; // on modifier le compteur pour l'incrémenter de 1 quand il y a une erreur
      break; //on stoppe à la rencontre de chaque erreur
    case !verifierChamps(prenomValeur): //on test en passant en argument la variable prenomValeur et si ca retourne vrai donc faux avec ! :
      erreurEvenement(prenom, "+ 2 caractères de A à Z acceptés"); //on appelle la fonction d'erreur en passant en argument a variable de l'id du champ prenom et le message d'erreur
      pasValide++;
      break;
    default:
      succesEvenement(prenom);
  }
  //filtrer le champ nom
  switch (true) {
    case nomValeur === "":
      erreurEvenement(nom, "Tous les champs sont obligatoires");
      pasValide++;
      break;
    case !verifierChamps(nomValeur):
      erreurEvenement(nom, "+ 2 caractères de A à Z acceptés");
      pasValide++;
      break;
    default:
      succesEvenement(nom);
      break;
  }
  //filtrer le champ email
  switch (true) {
    case emailValeur === "":
      erreurEvenement(email, "Tous les champs sont obligatoires");
      pasValide++;
      break;
    case !verifierEmail(emailValeur):
      erreurEvenement(email, "Votre email est écrit de façon incorrect");
      pasValide++;
      break;
    default:
      succesEvenement(email);
      break;
  }
  //filtrer le champ date de naissance
  switch (true) {
    case naissanceValeur === "":
      erreurEvenement(naissance, "Veuillez indiquer votre date de naissance");
      pasValide++;
      break;
    default:
      succesEvenement(naissance);
      break;
  }
  //filtrer le champ nombre de tournoi effectué
  switch (true) {
    case nbrTournoiValeur < 0: //j'ai mis une condition bloquant les valeur déclarées en dessous de 0
      erreurEvenement(
        nbrTournoi,
        "Veuillez indiquer le nombre de tournoi participé"
      );
      pasValide++;
      break;
    default:
      succesEvenement(nbrTournoi);
      break;
  }
  //filtrer le champ pour le choix de la ville du futur tournoi
  switch (true) {
    case cocherChamps == "":
      erreurEvenement(
        locationPourAttribut,
        "Veuillez selectionner votre ville pour le tournoi"
      );
      pasValide++;
      break;
    default:
      succesEvenement(locationPourAttribut);
      break;
  }
  //erreur au *checkbox non coché des conditions
  switch (true) {
    case selectCondition == "":
      erreurEvenement(
        conditionPourAttribut,
        "Veuillez confirmer votre accord des conditions d'utilisation"
      );
      pasValide++;
      console.log("conditions refusées");
      break;
    default:
      succesEvenement(conditionPourAttribut);
      break;
  }
  // savoir si oui ou non l'utilisateur accepte d'être averti des nouveautés
  switch (true) {
    case selectEnregistrer == "":
      if (averti == true) {
        averti = false;
      } //je réalise une condition if pour basculer de vrai à faux et vice et versa selon ce que l'utilisateur coche
      break;
    default:
      if (averti == false) {
        averti = true;
      }
      break;
  }
  //écriture des actions de la fonction pour gerer les erreurs
  function erreurEvenement(inputErreur, message) {
    const parentChamp = inputErreur.parentElement; // recuperer le parent de l'élément
    //pour profiter des pseudo-elements ::after déjà présent dans le css :
    parentChamp.setAttribute("data-error", message); //mettre l'attribut data-error sur la valeur de la variable message passé par l'argument de la fonction
    parentChamp.removeAttribute("data-succes"); //effacer l'attribut *data-succes
    parentChamp.setAttribute("data-error-visible", true); // pour mettre l'attribut *data-error-visible pour profiter du css qui met les bords en rouge
  }
  //écriture des actions de la fonction pour gerer l'absence d'erreur
  function succesEvenement(inputSucces) {
    const parentChamp = inputSucces.parentElement;
    parentChamp.setAttribute("data-succes", "Parfait!"); // rajouter un attribut *data-succes
    parentChamp.setAttribute("data-error-visible", false);
  }

  function verifierChamps(champ) {
    return /^([a-zA-Z]{2,})+$/.test(champ); //vérification de l'alphabetavec les patterns Regex, de a-A jusqu'à z-Z pour le prénom et le nom, minimum 2 caractères
  }

  function verifierEmail(verifemail) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$/.test(verifemail); //verification du format de l'email avec les patterns Regex minimum 2 caractères, maximum 15 caracteres
  }

  //je déclare une fonction pour verifier si la personne accepte d'être avertie ou non
  function avertiVraiOuFaux(averti) {
    if (averti == false) {
      return "refuse d'être averti";
    } else {
      return "accepte d'être averti";
    }
  }
//si le compteur pasValide est audessus de 1 ou egale, j'arrete tout et j'affiche dans le console.log un message
  if (pasValide >= 1) {
    console.log("Pas valide : recommence ");
  } 
  //si *pasValide est inférieur à 1, on récupère toute les valeurs validées pour les afficher dans un *console.log. Ainsi, le code est ouvert a une continuité par notamment le stockage de ces données de façon permanente : base de données, .json ou autre
  else {
    console.log(
      "ça marche ! " +
        prenomValeur +
        " - " +
        nomValeur +
        " - " +
        emailValeur +
        " - " +
        " - " +
        naissanceValeur +
        " - " +
        " - tournoi de participé : " +
        nbrTournoiValeur +
        " - " +
        "ville selectionnée : " +
        cocherChamps +
        " - " +
        "conditions acceptées" +
        " - " +
        avertiVraiOuFaux(averti)
    );
  }
}

//appelle de la fonction *valider avec un écouteur d'évènement sur le bouton.
formulaireValidation.addEventListener("click", valider);
