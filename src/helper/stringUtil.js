// reemplazar _ por espacio
const replaceUnderscoresWithSpaces = (string) => {
  return string.replace(/_/g, ' ');
};

/* capitalizar primera letra */
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// función que recoge ambas
export const formatString = (string) => {
  const stringWithSpaces = replaceUnderscoresWithSpaces(string);
  return capitalizeFirstLetter(stringWithSpaces);
};
