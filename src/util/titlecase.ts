export const titleCase = (word: string) =>
  word
    .split(" ")
    .map((eachWord) => eachWord[0].toLocaleUpperCase() + eachWord.slice(1))
    .join(" ");

export const kebabToTitle = (word: string) =>
  titleCase(word.replace(/-/g, " "));
