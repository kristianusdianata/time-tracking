export function toCamelCase($word) {
  return $word.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}
