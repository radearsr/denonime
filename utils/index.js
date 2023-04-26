const toCapitalize = (text) => {
  const firstChar = text[0];
  const capital = firstChar.toUpperCase();
  return text.replace(firstChar, capital);
};

export default toCapitalize;
