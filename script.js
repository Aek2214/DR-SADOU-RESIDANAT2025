// Gestion des onglets
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("nav .tabs li").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelector("nav .tabs li.active").classList.remove("active");
      this.classList.add("active");
      const selectedTab = this.getAttribute("data-tab");
      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
        if (content.id === selectedTab) {
          content.classList.add("active");
        }
      });
    });
  });
  // Chargement des données par défaut
  loadDefaultData();
});

// Afficher/masquer une liste coulissante
function toggleList(id) {
  document.getElementById(id).classList.toggle("hidden");
}

// Fonction de lecture de son lors d'un ajout ou suppression
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) sound.play();
}

// -----------------------
// AJOUT ET GESTION DES COURS
// -----------------------

// Pour ajouter un nouveau cours dans une section (course ajouté via le champ)
function addNewCourse(section) {
  const input = document.getElementById(`${section}-new-course`);
  const courseName = input.value.trim();
  if (courseName === "") return;
  // Ajouter dans la liste disponible (pour cette section)
  if (section === "medical" || section === "biologie") {
    // Pour les sections organisées par catégorie, on ajoute dans une catégorie "Divers"
    let container = document.getElementById(`${section}-available-container`);
    // Vérifier s'il existe déjà une catégorie "Divers"
    let diversCategory = container.querySelector('.category[data-category="Divers"]');
    if (!diversCategory) {
      diversCategory = document.createElement("div");
      diversCategory.className = "category";
      diversCategory.setAttribute("data-category", "Divers");
      diversCategory.innerHTML = `<h4>Divers</h4><ul></ul>`;
      container.appendChild(diversCategory);
    }
    const ul = diversCategory.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `${courseName} <button onclick="addCourseFromAvailable(this, '${section}')">Ajouter</button>`;
    ul.appendChild(li);
  } else {
    // Pour la section chirurgical (liste plate)
    const ul = document.getElementById(`${section}-available-list`);
    const li = document.createElement("li");
    li.innerHTML = `${courseName} <button onclick="addCourseFromAvailable(this, '${section}')">Ajouter</button>`;
    ul.appendChild(li);
  }
  input.value = "";
  playSound("addSound");
}

// Ajouter un cours depuis la liste disponible vers la liste révisée
function addCourseFromAvailable(button, section) {
  const courseText = button.parentElement.firstChild.textContent.trim();
  const revisedUl = document.getElementById(`${section}-revised-list`);
  const li = document.createElement("li");
  li.innerHTML = `${courseText} <button onclick="removeItem(this)">Supprimer</button>`;
  revisedUl.appendChild(li);
  playSound("addSound");
}

// -----------------------
// AJOUT ET GESTION DES QCM
// -----------------------
function addNewQCM(section) {
  const textarea = document.getElementById(`${section}-new-qcm`);
  const qcmContent = textarea.value.trim();
  if (qcmContent === "") return;
  const ul = document.getElementById(`${section}-qcm-list`);
  const li = document.createElement("li");
  li.innerHTML = `${qcmContent} <button onclick="addQCMFromAvailable(this, '${section}')">Ajouter</button>`;
  ul.appendChild(li);
  textarea.value = "";
  playSound("addSound");
}

function addQCMFromAvailable(button, section) {
  const qcmText = button.parentElement.firstChild.textContent.trim();
  const selectedUl = document.getElementById(`${section}-selected-qcm`);
  const li = document.createElement("li");
  li.innerHTML = `${qcmText} <button onclick="removeItem(this)">Supprimer</button>`;
  selectedUl.appendChild(li);
  playSound("addSound");
}

// Supprimer un élément (cours ou QCM)
function removeItem(button) {
  button.parentElement.remove();
  playSound("removeSound");
}

// -----------------------
// CHARGEMENT DES DONNÉES PAR DÉFAUT
// -----------------------

// Structures de données pour la section MÉDICALE (données hiérarchisées par spécialité)
const medicalData = {
  "Médecine légale": [
    "Asphyxies mécaniques",
    "Mort subite",
    "Responsabilité médicale",
    "Examen de cadavre"
  ],
  "Neurologie": [
    "Hypertension intra crânienne",
    "Attente isolées des nerfs crâniens",
    "Neuropathies périphériques",
    "Céphalée",
    "Les épilepsies",
    "La sclérose en plaque",
    "Accident vasculaire cérébral",
    "Myasthénie, myopathie",
    "La maladie de parkinson",
    "Maladie d’Alzheimer"
  ],
  "Psychiatrie": [
    "Les urgences psychiatriques",
    "Psychotropes",
    "Troubles anxieux",
    "Troubles de l'humeur",
    "Schizophrénie",
    "Troubles du sommeil",
    "Psychiatrie médico-légale",
    "Les troubles délirants"
  ],
  "Pneumologie": [
    "Les pleurésies (séro-fibrineuses et purulentes",
    "Pneumothorax et pyo-pneumothorax",
    "Tuberculoses",
    "Traitement anti tuberculeux",
    "Pneumopathies infectieuses",
    "Les suppurations pulmonaires",
    "Dilatations des bronches",
    "Kyste hydatique du poumon",
    "Asthme bronchique",
    "Cancer primitif bronchique",
    "CAT devant une hémoptysie"
  ],
  "Néphrologie": [
    "Syndrome néphrétique",
    "Syndrome néphrotique",
    "Insuffisance rénale aigue",
    "Insuffisance rénale chronique",
    "Hypertension artérielle réno-vasculaire"
  ],
  "Dermatologie": [
    "Psoriasis",
    "Eczéma",
    "Tuberculose cutanée",
    "Pyodermite",
    "Mycoses superficielles",
    "Parasitoses cutanées (Gale et pédiculose)",
    "Tumeurs cutanées (carcinome basocellulaire – carcinoma épidermoïde)",
    "Acné"
  ],
  "Ophtalmologie": [
    "Cataracte",
    "Glaucome",
    "Vices de réfraction",
    "Uvéites",
    "Pathologie de la rétine",
    "Conjonctivites",
    "Trachomes",
    "Pathologie de la cornée"
  ],
  "ORL": [
    "Cancer du cavum",
    "Angine et amygdalectomie",
    "Rhino sinusites",
    "Diagnostique des vertiges",
    "Otites",
    "Dyspnée laryngée"
  ],
  "Hématologie": [
    "Anémies carentielles",
    "Leucémies aigues",
    "Leucémies chroniques",
    "Lymphomes",
    "Myélome multiple",
    "Hémophilie",
    "Syndromes thalassémiques",
    "Drépanocytose"
  ],
  "Gastro-entérologie": [
    "Le reflux gastro-œsophagien",
    "Les œsophagites caustiques",
    "Hémorragie digestive haute et basse : signes, diagnostic et traitement",
    "Ulcère gastroduodénal",
    "Tuberculose intestinal",
    "Rectocolite ulcéro-hémorragique",
    "Cirrhose du foie",
    "Pancréatites chroniques",
    "Maladie cœliaque",
    "Maladie de Crohn et rectocolite hémorragique"
  ],
  "Pédiatrie": [
    "Allaitement maternel",
    "Ictères du nouveau-né",
    "Anémies du nouveau-né",
    "Détresse respiratoire du nouveau-né",
    "Les urgences chirurgicales néonatales",
    "Rachitisme carentiel",
    "Convulsions et épilepsies",
    "Diarrhées aigues",
    "Déshydratation aigue du nourrisson",
    "Diabète sucré de l’enfant",
    "Glomérulonéphrite Aigue",
    "Syndrome néphrotique",
    "Vomissements",
    "Infections urinaires"
  ],
  "Endocrinologie": [
    "Diabète sucré",
    "Hypercortisolisme métabolique",
    "Insuffisance surrénale",
    "Complications du diabète (aigues et chroniques)",
    "Pied diabétique",
    "Insulinothérapie",
    "Hypo-hyperthyroidies",
    "Hyper para et hypoparathyroïdies",
    "Insuffisance antéhypophysaire",
    "Tumeurs hypophysaires"
  ],
  "Cardiologie": [
    "RAA",
    "Les valvulopathies",
    "L’AOMI",
    "L’embolie pulmonaire",
    "Les cardiopathies congénitales",
    "Les endocardites infectieuses",
    "Péricardite",
    "Angine de poitrine",
    "Infarctus du myocarde",
    "HTA",
    "Athérosclérose",
    "Insuffisance cardiaque",
    "Troubles du rythme",
    "Médicaments en cardiologie",
    "Thrombose veineuse profonde"
  ],
  "Epidémiologie": [
    "Vaccination et PEV",
    "Mesure de l’état de santé et indicateurs",
    "Epidémiologie générale des maladies transmissibles",
    "Epidémiologie générale des maladies non transmissibles",
    "Protection santé maternelle et infantile",
    "Méthodes épidémiologiques"
  ],
  "Médecine du travail": [
    "Accidents du travail et maladies professionnelles",
    "Intoxication aux métaux lourds (Plomb, mercure, arsenic)",
    "Les pesticides",
    "Risque biologique en milieu professionnel",
    "Les solvants"
  ],
  "Maladies infectieuses": [
    "Sepsis à BGN",
    "Méningites (purulentes et liquide clair)",
    "Fièvre typhoïde",
    "Brucellose",
    "Infection VIH",
    "Hépatites virales",
    "Paludisme",
    "Amibiase"
  ],
  "Rhumatologie": [
    "Lombalgies et radiculoalgies",
    "Séquelles orthopédiques de la polomyélite aigue",
    "Amputations",
    "Arthroses",
    "Paratétraplégie",
    "Scoliose",
    "Algoneurodystrophies",
    "Mal de Pott",
    "Polyarthrite rhumatoide",
    "Spondylarthrite ankylosante"
  ]
};

// Pour la section CHIRURGICALE : liste plate
const chirurgicalData = [
  "Appendicite aigue : signes, diagnostique et traitement",
  "Péritonite appendiculaire : signes, diagnostique et traitement",
  "Péritonites par perforation d’ulcère gastroduodénal",
  "Lithiase de la voie biliaire principale : signes, diagnostique et traitement",
  "Cholécystite aigue lithiasique : signes, diagnostique et traitement",
  "Cancer de la tête du pancréas : signes, diagnostique et traitement",
  "Occlusion intestinale aigue chez l’adulte et chez l’enfant : diagnostique et traitement",
  "Cancer de l’œsophage : diagnostic et traitement",
  "Cancer gastrique : signes, diagnostique et traitement",
  "Cancer du colon : signes, diagnostique et traitement",
  "Kyste hydatique du foie : diagnostique et traitement",
  "Pancréatites aigue : physiopathologie, diagnostique et traitement",
  "Hémorragies digestives hautes : signes, diagnostique et traitement",
  "Traumatismes fermés du thorax",
  "CAT devant une brûlure aigue récente avant la 48ème heure",
  "CAT devant un choc traumatique : signe, diagnostique et traitement",
  "Hypertension intracrânienne",
  "Traumatisme crânien",
  "L’hypertrophie bénigne de la prostate : diagnostic - traitement",
  "Le cancer de la prostate : diagnostic - traitement",
  "Le cancer du rein : diagnostic - traitement",
  "Le cancer de la vessie : diagnostic - traitement",
  "La lithiase urinaire : diagnostic - traitement - prévention",
  "Infections urinaires",
  "CAT devant hématurie",
  "CAT devant une rétention aigue d’urine",
  "CAT devant une torsion du testicule et de ses annexes",
  "Coliques néphrétiques : signe, diagnostique et traitement",
  "CAT devant une hémorragie de la délivrance",
  "Fibrome utérin : signe, diagnostique et traitement",
  "Kyste de l’ovaire : signe, diagnostique et traitement",
  "Cancer du col utérin : signe, diagnostique et traitement",
  "Cancer de l’endomètre : signe, diagnostique et traitement",
  "Grossesse extra-utérine",
  "Tumeurs de l’ovaire",
  "Hématome retro placentaire",
  "Hémorragie de la délivrance : diagnostic et traitement",
  "HTA et grossesse",
  "Cancer du sein : signe, diagnostique et traitement",
  "CAT devant un traumatisme du rachis",
  "CAT devant une fracture de membre",
  "Hémorragie sous arachnoïdienne",
  "Compressions médullaires",
  "Tumeurs cérébrales",
  "Fracture de l’extrémité supérieure du fémur",
  "Diagnostic d’une tumeur osseuse",
  "Ostéomyélite aigue : signe, diagnostique et traitement",
  "Fracture de l’extrémité inférieure du radius",
  "Fracture de la palette humérale de l’enfant",
  "Particularités des fractures chez l’enfant"
];

// Pour la section BIOLOGIE, données hiérarchisées
const biologieData = {
  "ANATOMIE": [
    "Anatomie de l’œil",
    "Anatomie de l’oreille",
    "Polygone de Willis",
    "Articulation de l’épaule",
    "Vascularisation artérielle du membre supérieur",
    "Plexus brachial",
    "Articulation de la hanche et du genou",
    "Le nerf sciatique",
    "Vascularisation artérielle du membre inférieur",
    "Anatomie de l’appareil cardio-vasculaire",
    "Vascularisation, innervation de l’estomac",
    "Bloc duodéno-pancréatique",
    "Voies biliaires",
    "Anatomie de l’appareil génital",
    "Anatomie de l’appareil urinaire"
  ],
  "PHYSIOLOGIE": [
    "La vision",
    "L’audition",
    "Physiologie générale de la cellule excitable",
    "Transmission synaptique, aspects physiologiques",
    "Synapses",
    "Système nerveux végétatif",
    "Médiateurs chimiques du système nerveux central",
    "Electrophysiologie de la cellule myocardique",
    "Révolution cardiaque",
    "Débit cardiaque",
    "Pression artérielle",
    "Principes d’enregistrement et d’interprétation d’un ECG normal",
    "Mécanique ventilatoire",
    "Échanges alvéolo-capillaires",
    "Rôle du système hormonal dans l’homéostasie",
    "Mécanismes d’action des hormones"
  ],
  "HISTOLOGIE": [
    "La vision",
    "L’audition",
    "Histologie du tissu musculaire strié",
    "L’anté-hypophyse et la post-hypophyse",
    "L’appareil génital male et femelle",
    "L’appareil urinaire",
    "Glandes thyroïdes",
    "Glandes surrénales"
  ],
  "BIOCHIMIE": [
    "Métabolisme phosphocalcique",
    "Métabolisme des glucides",
    "Métabolisme des protéines",
    "Métabolisme des lipides"
  ],
  "IMMUNOLOGIE": [
    "Réponse immunitaire non spécifique",
    "Hypersensibilités I, III, IV"
  ]
};

// Fonction permettant d'ajouter de façon intelligente les cours hiérarchisés dans la section Médicale
function loadMedicalData() {
  const container = document.getElementById("medical-available-container");
  for (const category in medicalData) {
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.setAttribute("data-category", category);
    catDiv.innerHTML = `<h4>${category}</h4><ul></ul>`;
    const ul = catDiv.querySelector("ul");
    medicalData[category].forEach(course => {
      const li = document.createElement("li");
      li.innerHTML = `${course} <button onclick="addCourseFromAvailable(this, 'medical')">Ajouter</button>`;
      ul.appendChild(li);
    });
    container.appendChild(catDiv);
  }
}

// Fonction permettant d'ajouter la liste plate des cours dans la section Chirurgicale
function loadChirurgicalData() {
  const ul = document.getElementById("chirurgical-available-list");
  chirurgicalData.forEach(course => {
    const li = document.createElement("li");
    li.innerHTML = `${course} <button onclick="addCourseFromAvailable(this, 'chirurgical')">Ajouter</button>`;
    ul.appendChild(li);
  });
}

// Pour la section Biologie, on crée un affichage par catégorie
function loadBiologieData() {
  const container = document.getElementById("biologie-available-container");
  for (const category in biologieData) {
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.setAttribute("data-category", category);
    catDiv.innerHTML = `<h4>${category}</h4><ul></ul>`;
    const ul = catDiv.querySelector("ul");
    biologieData[category].forEach(course => {
      const li = document.createElement("li");
      li.innerHTML = `${course} <button onclick="addCourseFromAvailable(this, 'biologie')">Ajouter</button>`;
      ul.appendChild(li);
    });
    container.appendChild(catDiv);
  }
}

// Fonction globale pour charger les données par défaut dans toutes les sections
function loadDefaultData() {
  loadMedicalData();
  loadChirurgicalData();
  loadBiologieData();
}