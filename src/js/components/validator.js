export function isValidCard(value, system) {
  return value.length >= system[0].digits[0] && value.length <= system[0].digits[1] && Luhn(value) ? true : false;
}

function Luhn(value) {
  let arr = [...value.toString()].map(Number).reverse();
  const sum = arr.reduce((acc, item, ind) => ind % 2 ? acc + ((item * 2 > 9 ? (item * 2) - 9 : item * 2)) : acc + item, 0);
  return sum % 10 === 0 ? true : false; 
} 
