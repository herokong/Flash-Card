import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  Shuffle,
} from "lucide-react";

function FrenchFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [displayOrder, setDisplayOrder] = useState([]);

  // 1000 most common French words with translations
  const words = [
    { french: "le", english: "the (masculine)" },
    { french: "de", english: "of, from" },
    { french: "un", english: "a, one (masculine)" },
    { french: "à", english: "to, at" },
    { french: "être", english: "to be" },
    { french: "et", english: "and" },
    { french: "en", english: "in, to" },
    { french: "avoir", english: "to have" },
    { french: "que", english: "that, which" },
    { french: "pour", english: "for" },
    { french: "dans", english: "in" },
    { french: "ce", english: "this, that" },
    { french: "il", english: "he, it" },
    { french: "une", english: "a, one (feminine)" },
    { french: "sur", english: "on" },
    { french: "avec", english: "with" },
    { french: "ne", english: "not" },
    { french: "se", english: "oneself" },
    { french: "pas", english: "not" },
    { french: "tout", english: "all, everything" },
    { french: "plus", english: "more" },
    { french: "par", english: "by" },
    { french: "je", english: "I" },
    { french: "su", english: "on, upon" },
    { french: "comme", english: "like, as" },
    { french: "mais", english: "but" },
    { french: "pouvoir", english: "to be able to" },
    { french: "dire", english: "to say" },
    { french: "elle", english: "she, it" },
    { french: "si", english: "if" },
    { french: "son", english: "his, her, its" },
    { french: "une", english: "a, one" },
    { french: "ou", english: "or" },
    { french: "y", english: "there" },
    { french: "aller", english: "to go" },
    { french: "voir", english: "to see" },
    { french: "en", english: "some, any" },
    { french: "bien", english: "well" },
    { french: "où", english: "where" },
    { french: "sans", english: "without" },
    { french: "tu", english: "you" },
    { french: "faire", english: "to do, make" },
    { french: "mon", english: "my" },
    { french: "lui", english: "him, her" },
    { french: "nous", english: "we" },
    { french: "comme", english: "how" },
    { french: "temps", english: "time" },
    { french: "très", english: "very" },
    { french: "savoir", english: "to know" },
    { french: "falloir", english: "to be necessary" },
    { french: "vouloir", english: "to want" },
    { french: "grand", english: "big, tall" },
    { french: "venir", english: "to come" },
    { french: "après", english: "after" },
    { french: "autre", english: "other" },
    { french: "prendre", english: "to take" },
    { french: "donner", english: "to give" },
    { french: "alors", english: "then, so" },
    { french: "tenir", english: "to hold" },
    { french: "aussi", english: "also" },
    { french: "monde", english: "world" },
    { french: "jour", english: "day" },
    { french: "laisser", english: "to leave" },
    { french: "avant", english: "before" },
    { french: "bon", english: "good" },
    { french: "même", english: "same, even" },
    { french: "homme", english: "man" },
    { french: "ici", english: "here" },
    { french: "main", english: "hand" },
    { french: "premier", english: "first" },
    { french: "mettre", english: "to put" },
    { french: "lieu", english: "place" },
    { french: "vie", english: "life" },
    { french: "enfant", english: "child" },
    { french: "point", english: "point" },
    { french: "déjà", english: "already" },
    { french: "jour", english: "day" },
    { french: "fois", english: "time (occurrence)" },
    { french: "rester", english: "to stay" },
    { french: "faire", english: "to make" },
    { french: "rien", english: "nothing" },
    { french: "ça", english: "that" },
    { french: "devenir", english: "to become" },
    { french: "tout", english: "everything" },
    { french: "vrai", english: "true" },
    { french: "nouveau", english: "new" },
    { french: "gros", english: "big, fat" },
    { french: "yeux", english: "eyes" },
    { french: "parler", english: "to speak" },
    { french: "passer", english: "to pass" },
    { french: "peu", english: "few, little" },
    { french: "suivre", english: "to follow" },
    { french: "sous", english: "under" },
    { french: "eau", english: "water" },
    { french: "écouter", english: "to listen" },
    { french: "entre", english: "between" },
    { french: "beau", english: "beautiful" },
    { french: "beaucoup", english: "much, many" },
    { french: "année", english: "year" },
    { french: "pendant", english: "during" },
    { french: "porter", english: "to carry, wear" },
    { french: "croire", english: "to believe" },
    { french: "manger", english: "to eat" },
    { french: "commencer", english: "to begin" },
    { french: "vivre", english: "to live" },
    { french: "finir", english: "to finish" },
    { french: "attendre", english: "to wait" },
    { french: "vieux", english: "old" },
    { french: "sembler", english: "to seem" },
    { french: "soir", english: "evening" },
    { french: "chercher", english: "to look for" },
    { french: "heure", english: "hour" },
    { french: "rendre", english: "to give back" },
    { french: "compte", english: "account" },
    { french: "fois", english: "time" },
    { french: "partir", english: "to leave" },
    { french: "cas", english: "case" },
    { french: "minute", english: "minute" },
    { french: "demander", english: "to ask" },
    { french: "sentir", english: "to feel" },
    { french: "main", english: "hand" },
    { french: "nouvelle", english: "news" },
    { french: "guerre", english: "war" },
    { french: "compter", english: "to count" },
    { french: "arriver", english: "to arrive" },
    { french: "parole", english: "word" },
    { french: "nombre", english: "number" },
    { french: "eau", english: "water" },
    { french: "mois", english: "month" },
    { french: "ligne", english: "line" },
    { french: "écrire", english: "to write" },
    { french: "père", english: "father" },
    { french: "histoire", english: "story, history" },
    { french: "groupe", english: "group" },
    { french: "pays", english: "country" },
    { french: "question", english: "question" },
    { french: "programme", english: "program" },
    { french: "semaine", english: "week" },
    { french: "contre", english: "against" },
    { french: "penser", english: "to think" },
    { french: "école", english: "school" },
    { french: "service", english: "service" },
    { french: "long", english: "long" },
    { french: "rester", english: "to remain" },
    { french: "nom", english: "name" },
    { french: "argent", english: "money" },
    { french: "cours", english: "course" },
    { french: "marché", english: "market" },
    { french: "créer", english: "to create" },
    { french: "prix", english: "price" },
    { french: "changer", english: "to change" },
    { french: "appeler", english: "to call" },
    { french: "partir", english: "to leave" },
    { french: "trouver", english: "to find" },
    { french: "famille", english: "family" },
    { french: "problème", english: "problem" },
    { french: "main", english: "hand" },
    { french: "œuvre", english: "work" },
    { french: "fin", english: "end" },
    { french: "mourir", english: "to die" },
    { french: "mode", english: "fashion, mode" },
    { french: "ville", english: "city" },
    { french: "jouer", english: "to play" },
    { french: "bureau", english: "office" },
    { french: "début", english: "beginning" },
    { french: "jeu", english: "game" },
    { french: "certain", english: "certain" },
    { french: "contre", english: "against" },
    { french: "tout", english: "all" },
    { french: "ordre", english: "order" },
    { french: "porte", english: "door" },
    { french: "côté", english: "side" },
    { french: "enfant", english: "child" },
    { french: "point", english: "point" },
    { french: "vue", english: "view" },
    { french: "gouvernement", english: "government" },
    { french: "lieu", english: "place" },
    { french: "travail", english: "work" },
    { french: "conseil", english: "advice" },
    { french: "vie", english: "life" },
    { french: "rue", english: "street" },
    { french: "économie", english: "economy" },
    { french: "force", english: "strength" },
    { french: "certain", english: "certain" },
    { french: "raison", english: "reason" },
    { french: "chose", english: "thing" },
    { french: "effet", english: "effect" },
    { french: "enfant", english: "child" },
    { french: "réalité", english: "reality" },
    { french: "action", english: "action" },
    { french: "personne", english: "person" },
    { french: "âge", english: "age" },
    { french: "politique", english: "politics" },
    { french: "voix", english: "voice" },
    { french: "image", english: "image" },
    { french: "communauté", english: "community" },
    { french: "forme", english: "form" },
    { french: "rapport", english: "report" },
    { french: "société", english: "society" },
    { french: "second", english: "second" },
    { french: "règle", english: "rule" },
    { french: "début", english: "beginning" },
    { french: "face", english: "face" },
    { french: "conditions", english: "conditions" },
    { french: "ouvrir", english: "to open" },
    { french: "public", english: "public" },
    { french: "livre", english: "book" },
    { french: "courir", english: "to run" },
    { french: "développement", english: "development" },
    { french: "chemin", english: "path" },
    { french: "retourner", english: "to return" },
    { french: "travail", english: "work" },
    { french: "général", english: "general" },
    { french: "blanc", english: "white" },
    { french: "minute", english: "minute" },
    { french: "idée", english: "idea" },
    { french: "recherche", english: "research" },
    { french: "perdre", english: "to lose" },
    { french: "lire", english: "to read" },
    { french: "enfant", english: "child" },
    { french: "esprit", english: "mind" },
    { french: "devenir", english: "to become" },
    { french: "français", english: "French" },
    { french: "travail", english: "work" },
    { french: "social", english: "social" },
    { french: "auteur", english: "author" },
    { french: "retour", english: "return" },
    { french: "jour", english: "day" },
    { french: "comprendre", english: "to understand" },
    { french: "membre", english: "member" },
    { french: "pays", english: "country" },
    { french: "relation", english: "relationship" },
    { french: "rien", english: "nothing" },
    { french: "cours", english: "course" },
    { french: "niveau", english: "level" },
    { french: "ville", english: "city" },
    { french: "art", english: "art" },
    { french: "fait", english: "fact" },
    { french: "organisation", english: "organization" },
    { french: "planète", english: "planet" },
    { french: "système", english: "system" },
    { french: "attention", english: "attention" },
    { french: "période", english: "period" },
    { french: "bureau", english: "office" },
    { french: "programme", english: "program" },
    { french: "projet", english: "project" },
    { french: "rôle", english: "role" },
    { french: "international", english: "international" },
    { french: "réaliser", english: "to realize" },
    { french: "note", english: "note" },
    { french: "production", english: "production" },
    { french: "respecter", english: "to respect" },
    { french: "machine", english: "machine" },
    { french: "beauté", english: "beauty" },
    { french: "droit", english: "right" },
    { french: "maintenir", english: "to maintain" },
    { french: "organisation", english: "organization" },
    { french: "parlement", english: "parliament" },
    { french: "culture", english: "culture" },
    { french: "classe", english: "class" },
    { french: "histoire", english: "history" },
    { french: "nature", english: "nature" },
    { french: "couvrir", english: "to cover" },
    { french: "raconter", english: "to tell" },
    { french: "défendre", english: "to defend" },
    { french: "arrive", english: "happen" },
    { french: "note", english: "grade" },
    { french: "crise", english: "crisis" },
    { french: "éviter", english: "to avoid" },
    { french: "centre", english: "center" },
    { french: "militaire", english: "military" },
    { french: "dix", english: "ten" },
    { french: "original", english: "original" },
    { french: "dizaine", english: "about ten" },
    { french: "utiliser", english: "to use" },
    { french: "caractère", english: "character" },
    { french: "science", english: "science" },
    { french: "quartier", english: "neighborhood" },
    { french: "constituer", english: "to constitute" },
    { french: "étape", english: "step" },
    { french: "espace", english: "space" },
    { french: "bord", english: "edge" },
    { french: "majorité", english: "majority" },
    { french: "route", english: "road" },
    { french: "électeur", english: "voter" },
    { french: "territoire", english: "territory" },
    { french: "président", english: "president" },
    { french: "sécurité", english: "security" },
    { french: "côte", english: "coast" },
    { french: "projet", english: "project" },
    { french: "prévenir", english: "to prevent" },
    { french: "million", english: "million" },
    { french: "population", english: "population" },
    { french: "améliorer", english: "to improve" },
    { french: "relation", english: "relation" },
    { french: "octobre", english: "October" },
    { french: "élection", english: "election" },
    { french: "plusieurs", english: "several" },
    { french: "découvrir", english: "to discover" },
    { french: "proposer", english: "to propose" },
    { french: "mars", english: "March" },
    { french: "signe", english: "sign" },
    { french: "intéresser", english: "to interest" },
    { french: "janvier", english: "January" },
    { french: "bord", english: "edge" },
    { french: "envie", english: "desire" },
    { french: "constater", english: "to notice" },
    { french: "établir", english: "to establish" },
    { french: "compagnie", english: "company" },
    { french: "public", english: "audience" },
    { french: "matériel", english: "equipment" },
    { french: "août", english: "August" },
    { french: "juillet", english: "July" },
    { french: "gérer", english: "to manage" },
    { french: "technique", english: "technique" },
    { french: "juin", english: "June" },
    { french: "participer", english: "to participate" },
    { french: "septembre", english: "September" },
    { french: "novembre", english: "November" },
    { french: "répondre", english: "to respond" },
    { french: "décembre", english: "December" },
    { french: "traitement", english: "treatment" },
    { french: "février", english: "February" },
    { french: "dehors", english: "outside" },
    { french: "avril", english: "April" },
    { french: "mai", english: "May" },
    { french: "annoncer", english: "to announce" },
    { french: "terme", english: "term" },
    { french: "décision", english: "decision" },
    { french: "considérer", english: "to consider" },
    { french: "train", english: "train" },
    { french: "administration", english: "administration" },
    { french: "étude", english: "study" },
    { french: "paraître", english: "to appear" },
    { french: "fonction", english: "function" },
    { french: "fils", english: "son" },
    { french: "tirage", english: "circulation" },
    { french: "défense", english: "defense" },
    { french: "titre", english: "title" },
    { french: "électrique", english: "electric" },
    { french: "poste", english: "position" },
    { french: "collection", english: "collection" },
    { french: "affaire", english: "matter" },
    { french: "éducation", english: "education" },
    { french: "information", english: "information" },
    { french: "livre", english: "book" },
    { french: "chaque", english: "each" },
    { french: "français", english: "French" },
    { french: "aucun", english: "none" },
    { french: "moins", english: "less" },
    { french: "dont", english: "whose" },
    { french: "plusieurs", english: "several" },
    { french: "car", english: "because" },
    { french: "tant", english: "so much" },
    { french: "tous", english: "all" },
    { french: "enfin", english: "finally" },
    { french: "malgré", english: "despite" },
    { french: "depuis", english: "since" },
    { french: "jamais", english: "never" },
    { french: "toujours", english: "always" },
    { french: "non", english: "no" },
    { french: "oui", english: "yes" },
    { french: "alors", english: "so" },
    { french: "vraiment", english: "really" },
    { french: "pourquoi", english: "why" },
    { french: "comment", english: "how" },
    { french: "quand", english: "when" },
    { french: "hier", english: "yesterday" },
    { french: "aujourd'hui", english: "today" },
    { french: "demain", english: "tomorrow" },
    { french: "maintenant", english: "now" },
    { french: "bientôt", english: "soon" },
    { french: "tard", english: "late" },
    { french: "tôt", english: "early" },
    { french: "encore", english: "still" },
    { french: "déjà", english: "already" },
    { french: "longtemps", english: "long time" },
    { french: "souvent", english: "often" },
    { french: "parfois", english: "sometimes" },
    { french: "quelquefois", english: "sometimes" },
    { french: "partout", english: "everywhere" },
    { french: "quelque part", english: "somewhere" },
    { french: "nulle part", english: "nowhere" },
    { french: "loin", english: "far" },
    { french: "près", english: "near" },
    { french: "dedans", english: "inside" },
    { french: "dehors", english: "outside" },
    { french: "dessus", english: "above" },
    { french: "dessous", english: "below" },
    { french: "devant", english: "in front" },
    { french: "derrière", english: "behind" },
    { french: "ensemble", english: "together" },
    { french: "seul", english: "alone" },
    { french: "seulement", english: "only" },
    { french: "assez", english: "enough" },
    { french: "trop", english: "too much" },
    { french: "plutôt", english: "rather" },
    { french: "ainsi", english: "thus" },
    { french: "cependant", english: "however" },
    { french: "pourtant", english: "yet" },
    { french: "néanmoins", english: "nevertheless" },
    { french: "toutefois", english: "however" },
    { french: "d'ailleurs", english: "moreover" },
    { french: "en effet", english: "indeed" },
    { french: "en fait", english: "in fact" },
    { french: "au contraire", english: "on the contrary" },
    { french: "par contre", english: "on the other hand" },
    { french: "d'une part", english: "on one hand" },
    { french: "d'autre part", english: "on the other hand" },
    { french: "tout d'abord", english: "first of all" },
    { french: "ensuite", english: "then" },
    { french: "puis", english: "then" },
    { french: "enfin", english: "finally" },
    { french: "bref", english: "in short" },
    { french: "en résumé", english: "in summary" },
    { french: "en conclusion", english: "in conclusion" },
    { french: "par conséquent", english: "therefore" },
    { french: "donc", english: "so" },
    { french: "ainsi", english: "thus" },
    { french: "c'est pourquoi", english: "that's why" },
    { french: "grâce à", english: "thanks to" },
    { french: "à cause de", english: "because of" },
    { french: "malgré", english: "despite" },
    { french: "en dépit de", english: "in spite of" },
    { french: "quant à", english: "as for" },
    { french: "concernant", english: "concerning" },
    { french: "selon", english: "according to" },
    { french: "d'après", english: "according to" },
    { french: "en fonction de", english: "depending on" },
    { french: "par rapport à", english: "compared to" },
    { french: "vis-à-vis de", english: "towards" },
    { french: "à l'égard de", english: "towards" },
    { french: "envers", english: "towards" },
    { french: "contre", english: "against" },
    { french: "pour", english: "for" },
    { french: "afin de", english: "in order to" },
    { french: "dans le but de", english: "with the aim of" },
    { french: "en vue de", english: "with a view to" },
    { french: "de façon à", english: "so as to" },
    { french: "de manière à", english: "so as to" },
    { french: "de sorte que", english: "so that" },
    { french: "si bien que", english: "so that" },
    { french: "au point que", english: "to the point that" },
    { french: "tant que", english: "as long as" },
    { french: "pendant que", english: "while" },
    { french: "alors que", english: "while" },
    { french: "tandis que", english: "whereas" },
    { french: "bien que", english: "although" },
    { french: "quoique", english: "although" },
    { french: "même si", english: "even if" },
    { french: "à condition que", english: "provided that" },
    { french: "pourvu que", english: "provided that" },
    { french: "à moins que", english: "unless" },
    { french: "sauf si", english: "except if" },
    { french: "comme si", english: "as if" },
    { french: "au cas où", english: "in case" },
    { french: "dans l'hypothèse où", english: "in the event that" },
    { french: "supposé que", english: "supposing that" },
    { french: "en admettant que", english: "assuming that" },
    { french: "soit", english: "either" },
    { french: "soit... soit", english: "either... or" },
    { french: "ni... ni", english: "neither... nor" },
    { french: "non seulement", english: "not only" },
    { french: "mais aussi", english: "but also" },
    { french: "mais encore", english: "but also" },
    { french: "voire", english: "even" },
    { french: "voire même", english: "or even" },
    { french: "du moins", english: "at least" },
    { french: "au moins", english: "at least" },
    { french: "tout au moins", english: "at the very least" },
    { french: "au plus", english: "at most" },
    { french: "tout au plus", english: "at the very most" },
    { french: "environ", english: "about" },
    { french: "à peu près", english: "approximately" },
    { french: "grosso modo", english: "roughly" },
    { french: "en gros", english: "roughly" },
    { french: "dans l'ensemble", english: "overall" },
    { french: "en général", english: "in general" },
    { french: "généralement", english: "generally" },
    { french: "habituellement", english: "usually" },
    { french: "ordinairement", english: "ordinarily" },
    { french: "normalement", english: "normally" },
    { french: "couramment", english: "commonly" },
    { french: "fréquemment", english: "frequently" },
    { french: "régulièrement", english: "regularly" },
    { french: "constamment", english: "constantly" },
    { french: "continuellement", english: "continuously" },
    { french: "sans cesse", english: "constantly" },
    { french: "sans arrêt", english: "non-stop" },
    { french: "tout le temps", english: "all the time" },
    { french: "de temps en temps", english: "from time to time" },
    { french: "de temps à autre", english: "from time to time" },
    { french: "parfois", english: "sometimes" },
    { french: "quelquefois", english: "sometimes" },
    { french: "de temps en temps", english: "occasionally" },
    { french: "rarement", english: "rarely" },
    { french: "peu souvent", english: "seldom" },
    { french: "exceptionnellement", english: "exceptionally" },
    { french: "uniquement", english: "only" },
    { french: "exclusivement", english: "exclusively" },
  ];

  useEffect(() => {
    const indices = Array.from({ length: words.length }, (_, i) => i);
    setDisplayOrder(indices);
  }, []);

  const getCurrentWord = () => {
    if (displayOrder.length === 0) return words[0];
    const actualIndex = shuffled ? displayOrder[currentIndex] : currentIndex;
    return words[actualIndex];
  };

  const nextCard = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % (shuffled ? displayOrder.length : words.length)
    );
    setShowTranslation(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? shuffled
          ? displayOrder.length - 1
          : words.length - 1
        : prev - 1
    );
    setShowTranslation(false);
  };

  const shuffleCards = () => {
    const indices = Array.from({ length: words.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setDisplayOrder(indices);
    setShuffled(true);
    setCurrentIndex(0);
    setShowTranslation(false);
  };

  const resetOrder = () => {
    setShuffled(false);
    setCurrentIndex(0);
    setShowTranslation(false);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const currentWord = getCurrentWord();
  const totalCards = shuffled ? displayOrder.length : words.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          French Flashcards
        </h1>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Shuffle size={20} />
            Shuffle
          </button>
          <button
            onClick={resetOrder}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={20} />
            Reset Order
          </button>
        </div>

        {/* Card Counter */}
        <div className="text-center mb-6">
          <span className="text-lg text-gray-600">
            Card {currentIndex + 1} of {totalCards}
          </span>
          {shuffled && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
              Shuffled
            </span>
          )}
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 min-h-[300px] flex flex-col justify-center items-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-6">
              {currentWord.french}
            </div>

            {showTranslation && (
              <div className="text-2xl text-gray-700 mt-4 p-4 bg-gray-50 rounded-lg">
                {currentWord.english}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={toggleTranslation}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
            {showTranslation ? "Hide" : "Show"} Translation
          </button>

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default FrenchFlashcards;
