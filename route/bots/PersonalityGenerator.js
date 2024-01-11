export default function getRandomPersonality() {
    const personalityTraits = [
      "Openness",
      "Conscientiousness",
      "Extraversion",
      "Agreeableness",
      "Emotional Stability",
    ];
  
    // Générer un index aléatoire
    const randomIndex = Math.floor(Math.random() * personalityTraits.length);
  
    // Récupérer l'élément correspondant à l'index aléatoire
    const randomPersonality = personalityTraits[randomIndex];
  
    return randomPersonality;
  }
  