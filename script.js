// Galeries de projets : navigation au clic et au clavier, sans dépendance.
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('.gallery-track');
  const images = [...track.querySelectorAll('img')];
  const count = gallery.querySelector('[data-count]');
  let index = 0;

  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    count.textContent = `${index + 1} / ${images.length}`;
  }

  gallery.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  gallery.querySelector('[data-next]').addEventListener('click', () => show(index + 1));

  // Les images peuvent également défiler au doigt sur mobile.
  let startX = null;
  gallery.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });
  gallery.addEventListener('touchend', (event) => {
    if (startX === null) return;
    const dx = event.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  show(0);
});


// Traductions de l'interface. Le français reste la langue par défaut dans le HTML.
const translations = {
  "Paul Ferran | Développeur gameplay": "Paul Ferran | Gameplay Developer",
  "Aller au contenu": "Skip to content",
  "Projets": "Projects",
  "Profil": "About",
  "Développeur gameplay · Lyon": "Gameplay Developer · Lyon",
  "Je programme des jeux et les systèmes qui les font fonctionner.": "I build games and the systems behind them.",
  "Diplômé en développement de jeux vidéo, je travaille principalement avec Unity, C# et C++. J'aime construire des mécaniques jouables, les tester et améliorer leur fonctionnement.": "I graduated in game development and mainly work with Unity, C#, and C++. I enjoy building gameplay mechanics, testing them, and refining how they feel and work.",
  "Voir mes projets": "View my projects",
  "Me contacter": "Get in touch",
  "En bref": "At a glance",
  "Gameplay & systèmes": "Gameplay & systems",
  "Bachelor obtenu en 2026": "Bachelor’s degree, 2026",
  "Sélection de travaux": "Selected work",
  "Des projets réalisés pendant ma formation, en équipe ou en petit groupe. Pour chacun, je précise les parties que j'ai développées.": "Projects completed during my studies, in teams of different sizes. For each one, I highlight what I personally worked on.",
  "Projet de fin d'études · Unity / C#": "Graduation project · Unity / C#",
  "Projet de fin d'études": "Graduation project",
  "Un jeu situé dans une librairie de Montmartre, où le joueur incarne un bouquiniste. Projet réalisé avec une équipe pluridisciplinaire.": "A game set in a Montmartre bookshop, where you play as a bookseller. Built by a multidisciplinary team.",
  "Mon travail": "My contribution",
  "Développement de systèmes de jeu et intégration des énigmes.": "Developed game systems and implemented puzzles.",
  "Projet d'équipe récompensé par The Rookies.": "Team project recognized by The Rookies.",
  "Énigmes": "Puzzles",
  "Prototype multijoueur · Unity / C#": "Multiplayer prototype · Unity / C#",
  "Prototype de hero shooter dans lequel deux personnages défendent le cœur d'un château contre des ennemis.": "A hero shooter prototype in which two playable characters defend a castle's core against enemies.",
  "Programmation du grappin, des déplacements des personnages et du système de tir.": "Programmed the grappling hook, character movement, and shooting system.",
  "Voir le dépôt GitHub": "View GitHub repository",
  "Projet court · Unity / Shader Graph": "Short project · Unity / Shader Graph",
  "Shaders & effets": "Shaders & effects",
  "Un jeu réalisé en une semaine autour des effets visuels, avec un gameplay volontairement simple pour consacrer davantage de temps au rendu et aux finitions.": "A one-week game project focused on visual effects. We kept the gameplay simple to spend more time on visuals and polish.",
  "Gameplay, polish et réalisation de certains shaders.": "Gameplay, polish, and implementation of several shaders.",
  "Découverte d'Unreal Engine · Équipe de 2": "Learning Unreal Engine · Team of 2",
  "Prototype d'énigmes": "Puzzle prototype",
  "Un prototype créé en deux semaines pour prendre en main Unreal Engine, autour de portails et d'énigmes.": "A two-week prototype built to learn Unreal Engine, featuring portals and puzzles.",
  "Logique des portails et level design.": "Portal logic and level design.",
  "Parcours": "Background",
  "À propos": "About me",
  "J'ai obtenu mon Bachelor en développement informatique, option jeux vidéo, à Gaming Campus Lyon en juillet 2026.": "I earned my Bachelor’s degree in computer development, specializing in video games, at Gaming Campus Lyon in July 2026.",
  "J'aime autant programmer des mécaniques de gameplay que travailler sur les systèmes qui les accompagnent. J'ai notamment réalisé un Entity Component System en C++ et des outils de génération procédurale avec Python.": "I enjoy programming gameplay mechanics as much as building the systems behind them. My work includes an Entity Component System in C++ and procedural generation tools using Python.",
  "Je recherche aujourd'hui un premier poste en développement de jeux vidéo, avec une préférence pour le gameplay et Unity.": "I am currently looking for my first role in game development, with a particular interest in gameplay programming and Unity.",
  "Technologies": "Technologies",
  "Langages": "Languages",
  "Moteurs": "Engines",
  "Outils": "Tools",
  "Domaines": "Areas",
  "Gameplay, architecture, outils": "Gameplay, architecture, tools",
  "Discutons d'un projet.": "Let's talk about your project.",
  "Basé à Lyon, je suis ouvert aux opportunités en développement de jeux vidéo.": "Based in Lyon, I'm open to opportunities in game development.",
  "Écrire un e-mail": "Send an email",
  "Portfolio · Développement de jeux vidéo": "Portfolio · Game development"
};
const attributeTranslations = {
  "Navigation principale": "Main navigation",
  "Choix de la langue": "Language selection",
  "Paul Ferran, accueil": "Paul Ferran, home",
  "En bref": "At a glance",
  "Captures du projet de fin d'études": "Graduation project screenshots",
  "Écran du projet de fin d'études": "Graduation project screen",
  "Première énigme du jeu": "First puzzle in the game",
  "Deuxième énigme du jeu": "Second puzzle in the game",
  "Image précédente": "Previous image",
  "Image suivante": "Next image",
  "Captures de Room Defenders": "Room Defenders screenshots",
  "Personnage Robobastos de Room Defenders": "Robobastos character from Room Defenders",
  "Personnage Glocktopus de Room Defenders": "Glocktopus character from Room Defenders",
  "Mécanique de grappin de Room Defenders": "Grappling hook mechanic in Room Defenders",
  "Captures du projet Shaders et effets": "Shaders and effects project screenshots",
  "Menu du projet de shaders": "Shaders project menu",
  "Effet visuel d'attaque à l'épée": "Sword attack visual effect",
  "Effet d'arrêt du temps": "Time-stop effect",
  "Effet de tornade": "Tornado effect",
  "Captures du prototype Unreal": "Unreal prototype screenshots",
  "Vue du prototype de portails": "Portal prototype screenshot",
  "Deuxième vue du prototype de portails": "Second portal prototype screenshot",
  "Troisième vue du prototype de portails": "Third portal prototype screenshot"
};

// On conserve les textes d'origine pour pouvoir revenir au français sans recharger la page.
const textEntries = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const original = node.nodeValue;
  const trimmed = original.trim();
  if (Object.hasOwn(translations, trimmed)) {
    const start = original.indexOf(trimmed);
    textEntries.push({node, prefix: original.slice(0, start), french: trimmed, suffix: original.slice(start + trimmed.length)});
  }
}
const attributeEntries = [];
document.querySelectorAll('[aria-label], [alt]').forEach((element) => {
  for (const attribute of ['aria-label', 'alt']) {
    const french = element.getAttribute(attribute);
    if (french && Object.hasOwn(attributeTranslations, french)) {
      attributeEntries.push({element, attribute, french});
    }
  }
});

const languageButtons = [...document.querySelectorAll('[data-lang]')];
function setLanguage(language) {
  const english = language === 'en';
  document.documentElement.lang = english ? 'en' : 'fr';
  textEntries.forEach(({node, prefix, french, suffix}) => {
    node.nodeValue = prefix + (english ? translations[french] : french) + suffix;
  });
  attributeEntries.forEach(({element, attribute, french}) => {
    element.setAttribute(attribute, english ? attributeTranslations[french] : french);
  });
  document.title = english ? translations['Paul Ferran | Développeur gameplay'] : 'Paul Ferran | Développeur gameplay';
  document.querySelector('meta[name="description"]').content = english
    ? 'Portfolio of Paul Ferran, Unity/C# and C++ gameplay developer. Game projects, systems and programming.'
    : 'Portfolio de Paul Ferran, développeur gameplay Unity/C# et C++. Projets de jeux vidéo, systèmes et programmation.';
  languageButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === (english ? 'en' : 'fr')));
  });
  try { localStorage.setItem('portfolio-language', english ? 'en' : 'fr'); } catch (_) {}
}
languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let savedLanguage = 'fr';
try { savedLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'fr'; } catch (_) {}
setLanguage(savedLanguage);
