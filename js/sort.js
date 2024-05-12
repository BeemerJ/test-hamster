// Function to sort questions based on sort method
export function sortQuestions(sections, sortMethod) {
    switch (sortMethod) {
      case 1: // Sequential
        return sortSequential(sections);
      case 2: // Random Section Sequential
        return sortRandomSectionSequential(sections);
      case 3: // Sequential Section Random
        return sortSequentialSectionRandom(sections);
      case 4: // Random
        return sortRandom(sections);
      default:
        return [];
    }
  }
  
  // Helper function to sort questions sequentially
  function sortSequential(sections) {
    return sections.flatMap(section => section.questions);
  }
  
  // Helper function to sort sections randomly, but questions within each section remain sequential
  function sortRandomSectionSequential(sections) {
    return shuffle(sections).flatMap(section => section.questions);
  }
  
  // Helper function to sort sections sequentially, but questions within each section are shuffled randomly
  function sortSequentialSectionRandom(sections) {
    return sections.flatMap(section => shuffle(section.questions));
  }
  
  // Helper function to shuffle all questions randomly, disregarding sections
  function sortRandom(sections) {
    return shuffle(sections.flatMap(section => section.questions));
  }
  
  // Function to shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }