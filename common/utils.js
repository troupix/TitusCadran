// Ajouter un zéro devant les nombres < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Formater les nombres avec virgule (1250 → 1,250)
export function formatNumber(num) {
  return num.toLocaleString();
}

export function formatSteps(steps) {
  if (steps >= 1000) {
    return (steps / 1000).toFixed(1) + "k";
  }
  return steps.toString();
}
