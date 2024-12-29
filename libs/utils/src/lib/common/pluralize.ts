export function pluralize(word: string): string {
  const irregularPlurals: Record<string, string> = {
    child: 'children',
    person: 'people',
    man: 'men',
    woman: 'women',
    mouse: 'mice',
    tooth: 'teeth',
    foot: 'feet',
    goose: 'geese',
    ox: 'oxen',
    cactus: 'cacti',
    focus: 'foci',
    radius: 'radii',
    syllabus: 'syllabi',
  };

  const uncountableWords = [
    'fish',
    'sheep',
    'deer',
    'moose',
    'series',
    'species',
    'data',
    'equipment',
    'information',
    'rice',
    'money',
  ];

  // Check for uncountable words
  if (uncountableWords.includes(word.toLowerCase())) {
    return word;
  }

  // Check for irregular plurals
  if (irregularPlurals[word.toLowerCase()]) {
    return irregularPlurals[word.toLowerCase()];
  }

  // Regular pluralization rules
  if (word.endsWith('y') && !/[aeiou]y$/i.test(word)) {
    // If the word ends with "y" and is preceded by a consonant
    return word.slice(0, -1) + 'ies';
  } else if (
    word.endsWith('s') ||
    word.endsWith('x') ||
    word.endsWith('z') ||
    word.endsWith('sh') ||
    word.endsWith('ch')
  ) {
    // If the word ends with "s", "x", "z", "sh", or "ch"
    return word + 'es';
  } else if (word.endsWith('f')) {
    // If the word ends with "f"
    return word.slice(0, -1) + 'ves';
  } else if (word.endsWith('fe')) {
    // If the word ends with "fe"
    return word.slice(0, -2) + 'ves';
  } else {
    // Default rule: just add "s"
    return word + 's';
  }
}
