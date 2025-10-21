export function isNotEmptyElement(nameArray) {
  const filteredEmptyElement = nameArray.filter((name) => name.length === 0);
  return filteredEmptyElement.length === 0;
}

export function isNotOverFiveChar(nameArray) {
  const filteredEmptyElement = nameArray.filter((name) => name.length > 5);
  return filteredEmptyElement.length === 0;
}

export function isNotDuplicateName(nameArray) {}
