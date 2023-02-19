function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}//pour le menu responsive déclenché au click

// DOM Elements
const modalContentTotal = document.querySelector(".content");//recupere le contenu principal
const modalbg = document.querySelector(".bground"); //recupere la base du formulaire
const modalContent = document.querySelectorAll(".formData"); //recupere dans le dom les elements de la classe *formData, ce sont les parents des inputs
const modalBtn = document.querySelectorAll(".modal-btn");//bouton d'inscription
const boutonFermer = document.querySelector(".close"); //bouton fermer
// const btnSignup = document.querySelector(".btn-signup");
const formConfirmation = document.querySelector(".formConfirmation"); // selectionner la page de confirmation de l'enregistrement
const boutonValidation = document.getElementById("valider"); //bouton valider
const boutonQuitter = document.getElementById("quitter");//bouton quitter qui apparait apres l'inscription confirmée


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", lancerFormulaire));

// launch modal form
function lancerFormulaire() {
  modalbg.style.visibility = "visible";
  boutonValidation.style.visibility = "visible";
  //gestion des apparitions des blocks, la propriete visibility est utilisé a la place de display pour conserver leurs occupations initiales de l'espace
  modalContent.forEach((form) => {form.style.visibility = "visible";form.style.animationName = null;});//gestion de l'animation @keyframe, initialiser le nom a nul de l'animation
  modalContentTotal.style.animationName = "modalopen";//on profite de la keyframe du css et on l'active au lancement du formulaire en installant le nom de l'animation dans le style  
}

// fermer le formulaire
function fermerFormulaire() {
  modalbg.style.visibility = "hidden";
  formConfirmation.style.visibility = "hidden";
  boutonValidation.style.visibility = "hidden";
  modalContentTotal.removeAttribute("style");//pour réinitialiser l'animation modalopen
  modalContent.forEach((form) => {form.style.visibility = "hidden";form.style.animationName="fermetureChamp";}); //realise une boucle au sein de tous les elements de la 
  //classe selectionnée et les rends invisible, rend actif l'animation des champs à la fermeture;
}

// déclencher la fermeture du formulaire
boutonFermer.addEventListener("click", fermerFormulaire);
boutonQuitter.addEventListener("click", fermerFormulaire);

//confirmer le formulaire
function confirmerFormulaire() {
  formConfirmation.style.visibility = "visible";
  modalbg.style.visibility = "visible";
  modalContent.forEach((form) => {form.style.visibility = "hidden";form.style.animationName="fermetureChamp";});//pour chaque parent d'un input, ajout d'une animation keyframe et activation au moment de la fermeture du formulaire
  boutonValidation.style.visibility = "hidden";
}

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

//création d'une classe pour validé les objets verifier, le constructor construit les proprietes que le nouvel objet alimentera et les lies à lui meme
class valeurVerifiee {
  constructor(titreStringChamps, titreChamps, genreChamps, valide) {
    this.titreString = titreStringChamps; //l'intitulé du champs pour lire les retours en string proprement
    this.titre = titreChamps; // les données issues querySelector, il va récuperer les id, name, ou .class du dom
    this.genre = genreChamps; //le type de l'objet a verifier : une valeur string ou nombre ne sera pas traité pareil
    this.valide = valide; // pour un retour booleen de la validation de l'objet
  }
  //on commence par les methodes de verification :
  //verification des entrees string
  verifierString() {
    return /^([a-zA-Z]{2,})+$/.test(this.titre.value); //vérification de l'alphabet avec les patterns Regex, de a-A jusqu'à z-Z pour le prénom et le nom, minimum 2 caractères
  }
  //verification des entrees emails
  verifierEmail() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$/.test(
      this.titre.value
    ); //verification du format de l'email avec les patterns Regex, apres le point, minimum 2 caractères, maximum 15 caracteres
  }

  //methode d'erreur avec en argument le message d'erreur recupéré du filtre par type de données
  erreurEvenement(message) {
    const parentTitre = this.titre.parentElement; // recuperer le parent de l'élément
    //pour profiter des pseudo-elements ::after déjà présent dans le css :
    //verification des messages d'erreur et action des evenements qui en découle
    if (message === "Parfait!") {
      // parentTitre.setAttribute("data-succes", message), //on profite de l'attribut déjà présent dans le css d'origine avec le pseudo-eement ::after
        parentTitre.removeAttribute("data-error-visible"),
        parentTitre.removeAttribute("data-error"); //pour enlever l'attribut *data-error ainsi on change de couleur la police
        parentTitre.style.animationName = null;
    } else {
      // parentTitre.removeAttribute("data-succes"), //en cas de contradiction de la condition, on fait l'inverse
        parentTitre.setAttribute("data-error", message), //on installe l'attribut data-error
        parentTitre.setAttribute("data-error-visible", true); // pour mettre l'attribut *data-error-visible pour profiter du css qui met les bords en rouge
        parentTitre.style.animationName = "opaciteProgressive";
        parentTitre.style.animationDuration="0.5s";
      }
  }

  //la méthode erreurGenre va retourner un message et un etat valide booleen selon le type de l'objet scanné
  erreurGenre(testerType) {
    let messageErreur = "Parfait!"; //par défaut le message est sur *parfait
    this.valide = true; //par défaut la propriete valide est vrai
    const valeurFiltre = this.titre.value.trim(); //on réalise de nouvelle constante en effacant les espaces superflue
    const valeurNombre = parseInt(this.titre.value); //on réalise une nouvelle constante pour les chiffres, l'entrée sera convertie en en entier
    //recours au switch pour tester le type et retourner les erreurs adéquates
    switch (testerType) {
      case "string": //pour le type string
        if (valeurFiltre === "") {
          messageErreur = "Tous les champs sont obligatoires";
          this.valide = false;
        } else if (!this.verifierString()) {
          messageErreur = "+ 2 caractères de A à Z acceptés"; //recours a la methode presente dans la classe pour comparer les valeurs des textes au pattern regex
          this.valide = false;
        }
        break;

      case "email": // pour le type email, attention, ce sont des types indiqués manuellement dans la propriete de l'objet correspondante
        if (!this.verifierEmail()) {
          messageErreur = "l'email est incorrect"; //la methode est appellé pour comparer le champ email, si retourne l'inverse de true, l'etat de l'objet est invalide
          this.valide = false;
        }
        break;
      case "date":
        if (valeurFiltre === "") {
          messageErreur = "Quel est votre date ";
          this.valide = false;
        }
        break;

      case "nombre":
        if (valeurNombre === "" || valeurNombre < 0 || valeurNombre >99) {
          messageErreur = "Vous devez indiquer combien ";
          this.valide = false;
        }
        break;

      case "radio": //si pas coché il retourne faux
        if (this.titre.checked == false) {
          messageErreur = "Vous devez indiquer votre choix";
          this.valide = false;
        }
        break;

      case "coche":
        if (this.titre.checked == false) {
          this.valide = false;
        }
        break;

      default: //par defaut, ce tout retourne faux on active le message d'erreur, et on invalide l'etat de l'objet
        if (!valeurFiltre || !valeurNombre) {
          messageErreur = "Tous les champs sont obligatoires";
          this.valide = false;
        }
        break;
    }
    return messageErreur; //on retourne le message d'erreur final pour qu'il soit traité par la methode erreurEvenement présente plus haut
  }

  retourTypeChamps() {
    //une methode finale qu'on devra activer avec l'appel du nouvel objet, celle-ci permet de mettre en argument dans erreurEvenement
    //le retour de la methode erreurGenre qui contient lui meme dans son propre argument le type de l'objet meme.
    this.erreurEvenement(this.erreurGenre(this.genre));

    return this.valide; //retourne l'etat de l'objet lui-meme une fois traité
  }
}

//une classe pour recuperer et traiter les nouvelles entites des champs du formulaire en eux meme qui sont dans un état non vérifié.
//Dans le but de rendre plus claire le code. Elle prend 4 proprietes, le titre du label en string, la valeur recuperée du dom, le genre, et son etat.

class ObjetChamps {
  constructor(titre, valeur, genre, valide) {
    this.titre = titre;
    this.valeur = valeur;
    this.genre = genre;
    this.valide = valide;
  }
}
//la fonction valider sera appellée au clique et créera les nouveaux objets dépendantes des classes.
function valider(event) {
  event.preventDefault(); //on previent le comportement par défaut

  /*une fonction uniquement pour les type radio est effectué pour éviter les invalidités "null" en cas d'absence de check
  tres important pour que la class valeurVerifiee puisse travailler */
  function cocheRadio(check, valeur) {
    //deux arguments, une qui appelle dans le dom la valeur qui est checked, et l'autre la valeur sans checked.
    /*les gestions des actions sur les attributs data-error, ont besoin d'un queryselector valide. Ainsi tout est geré avant
    la verification des entites du formulaire, celui-ci ne renverra que des valeurs exploitables*/
    if (!document.querySelector(check)) {
      return document.querySelector(valeur);
    } else {
      return document.querySelector(check);
    }
  }
  //creation des constantes pour travailler avec les ids du dom
  const prenom = document.querySelector("#first"); //selection des id correspondant au champs
  const nom = document.querySelector("#last");
  const email = document.querySelector("#email");
  const naissance = document.querySelector("#birthdate");
  const nbrTournoi = document.querySelector("#quantity");

  const ville = cocheRadio(
    //dans le meme principe mais aussi appelle la fonction cocheRadio et met en argument les deux valeurs name, une checked et une non
    "input[name='location']:checked",
    "input[name='location']"
  );
  const condition = cocheRadio(
    "input[name='condition']:checked",
    "input[name='condition']"
  );
  const enregistre = cocheRadio(
    "input[name='enregistre']:checked",
    "input[name='enregistre']"
  );

  //creation d'un tableau pour stocker tous les nouveaux objets. elle prenne 4 proprietes, et la derniere propriete :valide est par défaut : false, tant que non verifié

  let champsQuestionnaire = [
    new ObjetChamps("prenom", prenom, "string", false),
    new ObjetChamps("nom", nom, "string", false),
    new ObjetChamps("email", email, "email", false),
    new ObjetChamps("naissance", naissance, "date", false),
    new ObjetChamps("nombre de Tournoi", nbrTournoi, "nombre", false),
    new ObjetChamps("ville", ville, "radio", false),
    new ObjetChamps("condition", condition, "radio", false),
    new ObjetChamps("enregistré(e)", enregistre, "coche", false),
  ];

  let objetFaux = 0; //creation d'une variable pour compter le nombre d'etat faux qu'il y aura apres la vérification de mes objets
  //mise en route de la boucle pour parcourir le tableau et créer des nouveaux objets dans un etat verifié
  champsQuestionnaire.forEach((objetChampsIndex) => {
    new valeurVerifiee(
      objetChampsIndex.titre,
      objetChampsIndex.valeur,
      objetChampsIndex.genre,
      objetChampsIndex.valide
    ).retourTypeChamps();
    //une condition pour verifier si mes objets vérifiés retourne vrai ou faux
    if (
      new valeurVerifiee(
        objetChampsIndex.titre,
        objetChampsIndex.valeur,
        objetChampsIndex.genre,
        objetChampsIndex.valide
      ).retourTypeChamps() === false
    ) {
      objetFaux++; //on incremente tant qu'il y a des faux
      console.log(objetFaux);
    }
  });
  //une fois tout ce parcours réalisé, nous pouvons verifier le nombre de faux, et ainsi en cas d'absence ou <1 nous pouvons lancer la suite des actions,
  //en appelant la fonction pour confirmer le formulaire et passer à l'etat des remerciements
  //un seul false indique simplement que la personne ne veut pas s'enregistrer à la news.
  if (objetFaux <= 1) {
    confirmerFormulaire();
    let votrePrenom = prenom.value;
    let votreNom = nom.value;
    let votreMail = email.value;
    let votreDate = naissance.value;
    let votreNbrTournoi = nbrTournoi.value;
    let votreVilleTournoi = ville.value;
    // let vosConditions = condition.value; variable non utilisée mais exploitable pour la suite
    // let vosNews = enregistre.value;

    console.log(`votre prénom est : ${votrePrenom} - votre nom est : ${votreNom} - votre email est : ${votreMail} - votre date de naissance est :
    ${votreDate} - vous avez réalisé : ${votreNbrTournoi} tournoi(s) - la ville que vous avez choisi : ${votreVilleTournoi} - vous acceptez les 
    conditions - vous voulez être au courant : ${(objetFaux === 0 ? true : false)
    }`);

    document.querySelectorAll(".formData input").forEach((input) => {
      input.value = "";
      input.parentElement.removeAttribute("data-succes");
    }); //vider les champs apres la confirmation, réinitialiser le message d'evenement d'erreur
  }
}

boutonValidation.addEventListener("click", valider); //appeller la fonction valider au clique sur envoyer.
