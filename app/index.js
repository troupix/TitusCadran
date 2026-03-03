import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { zeroPad, formatSteps, formatDistance } from "../common/utils";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";

// Update the clock every minute
clock.granularity = "minutes";

// Get elements
const timeDisplay = document.getElementById("timeDisplay");
const ampmDisplay = document.getElementById("ampm");
const stepCount = document.getElementById("stepCount");
const heartRate = document.getElementById("heartRate");
const dateElement = document.getElementById("dateDisplay");
const distanceCount = document.getElementById("distanceCount");
const boneBatteryElement = document.getElementById("batteryBone");
const battery5Element = document.getElementById("batteryIcon_5");
const battery20Element = document.getElementById("batteryIcon_20");
const battery40Element = document.getElementById("batteryIcon_40");
const battery60Element = document.getElementById("batteryIcon_60");
const battery80Element = document.getElementById("batteryIcon_80");
const battery100Element = document.getElementById("batteryIcon_100");

// Get digit image elements
const digit1 = document.getElementById("digit1");
const digit2 = document.getElementById("digit2");
const colon = document.getElementById("colon");
const digit3 = document.getElementById("digit3");
const digit4 = document.getElementById("digit4");

// Initialize heart rate sensor
// @ts-ignore
let hrm = new HeartRateSensor();
hrm.start();

// Update heart rate display
hrm.onreading = function () {
  heartRate.text = hrm.heartRate || "--";
};

// Function to update digit images
function updateDigitDisplay(hours, mins) {
  const hoursStr = zeroPad(hours).toString();
  const minsStr = zeroPad(mins).toString();

  digit1.href = `${hoursStr[0]}.png`;
  digit2.href = `${hoursStr[1]}.png`;
  digit3.href = `${minsStr[0]}.png`;
  digit4.href = `${minsStr[1]}.png`;
  colon.href = "deux_point.png";
}

// Function to update battery display
function updateBatteryVisibility() {
  const batteryLevel = battery.chargeLevel;

  // Hide all battery images first
  battery5Element.style.display = "none";
  battery20Element.style.display = "none";
  battery40Element.style.display = "none";
  battery60Element.style.display = "none";
  battery80Element.style.display = "none";
  battery100Element.style.display = "none";

  // Show appropriate battery image based on level
  if (batteryLevel <= 5) {
    battery5Element.style.display = "inline";
  } else if (batteryLevel <= 20) {
    battery20Element.style.display = "inline";
  } else if (batteryLevel <= 40) {
    battery40Element.style.display = "inline";
  } else if (batteryLevel <= 60) {
    battery60Element.style.display = "inline";
  } else if (batteryLevel <= 80) {
    battery80Element.style.display = "inline";
  } else {
    battery100Element.style.display = "inline";
  }
}

// Update the clock display
clock.ontick = function (evt) {
  let todayDate = evt.date;
  let hours = todayDate.getHours();
  let mins = todayDate.getMinutes();

  // Determine AM/PM
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format if user prefers 12h
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  }

  // Update digit images
  updateDigitDisplay(hours, mins);

  // Hide text display, show images instead
  timeDisplay.style.display = "none";

  ampmDisplay.text = preferences.clockDisplay === "12h" ? ampm : "";

  // Update step count
  let steps = today.adjusted.steps || 0;
  stepCount.text = formatSteps(steps);

  // Update distance
  let distance = today.adjusted.distance || 0;
  distanceCount.text = formatDistance(distance);

  // Format date with day name in French
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let dayName = dayNames[todayDate.getDay()];
  let monthName = monthNames[todayDate.getMonth()];
  let formattedDate = `${dayName} ${todayDate.getDate()} ${monthName}`;
  dateElement.text = formattedDate;

  // Update battery display
  updateBatteryVisibility();
};

// Initial battery update
updateBatteryVisibility();

// Listen for battery changes
battery.onchange = function () {
  updateBatteryVisibility();
};
