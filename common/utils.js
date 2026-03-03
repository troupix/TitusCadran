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

export function formatDistance(meters) {
  if (meters >= 1000) {
    return (meters / 1000).toFixed(1) + "km";
  }
  return meters.toString() + "m";
}

export function updateBatteryDisplay(batteryLevel) {
  // batteryLevel should be between 0 and 100

  const bar1 = document.getElementById("bar-1"); // Red
  const bar2 = document.getElementById("bar-2"); // Orange
  const bar3 = document.getElementById("bar-3"); // Yellow
  const bar4 = document.getElementById("bar-4"); // Green

  // Reset all bars
  [bar1, bar2, bar3, bar4].forEach((bar) => {
    bar.classList.remove("active", "critical");
  });

  // Turn on bars based on percentage
  if (batteryLevel > 0) bar1.classList.add("active");
  if (batteryLevel > 25) bar2.classList.add("active");
  if (batteryLevel > 50) bar3.classList.add("active");
  if (batteryLevel > 75) bar4.classList.add("active");

  // Trigger blinking animation if battery is critically low (e.g., under 10%)
  if (batteryLevel > 0 && batteryLevel <= 10) {
    bar1.classList.add("critical");
  }
}
