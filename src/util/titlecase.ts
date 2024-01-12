export const titleCase = (word: string) =>
  word
    .split(" ")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");
