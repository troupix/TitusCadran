import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { zeroPad, formatSteps, formatDistance } from "../common/utils";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { OrientationSensor } from "orientation";
import { display } from "display";

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
const northDot = document.getElementById("northDot");
const debugText = document.getElementById("debugText");

// Estimate screen dimensions (common Fitbit watch sizes)
// Versa/Versa 2/Versa Lite: 300x300, Ionic: 348x250, Sense/Versa 3: 336x336
const screenWidth = 300; // Adjust based on your device
const screenHeight = 300;
const centerX = screenWidth / 2;
const centerY = screenHeight / 2;
const radius = Math.min(screenWidth, screenHeight) / 2 - 15; // 15px margin from edge

// Initialize heart rate sensor
// @ts-ignore
let hrm = new HeartRateSensor();
hrm.start();

// Update heart rate display
hrm.onreading = function () {
  heartRate.text = hrm.heartRate || "--";
};

// Function to convert quaternion to heading (yaw angle)
function quaternionToHeading(q) {
  // q = [scalar, i, j, k]
  const w = q[0];
  const x = q[1];
  const y = q[2];
  const z = q[3];

  // Calculate yaw (rotation around Z axis)
  const siny_cosp = 2 * (w * z + x * y);
  const cosy_cosp = 1 - 2 * (y * y + z * z);
  let yaw = Math.atan2(siny_cosp, cosy_cosp);

  // Convert from radians to degrees
  let heading = yaw * (180 / Math.PI);

  // Normalize to 0-360
  if (heading < 0) {
    heading += 360;
  }

  return heading;
}

// Initialize orientation sensor for compass
if (OrientationSensor) {
  const orientation = new OrientationSensor({ frequency: 10 });

  orientation.addEventListener("reading", () => {
    // Get quaternion reading
    const quaternion = orientation.quaternion;

    // Convert quaternion to heading (0-360 degrees)
    const heading = quaternionToHeading(quaternion);

    // Convert heading to radians
    // Subtract 90 degrees to make 0° point up (north)
    const angleRadians = ((heading - 90) * Math.PI) / 180;

    // Calculate position on circle
    const x = centerX + radius * Math.cos(angleRadians);
    const y = centerY + radius * Math.sin(angleRadians);

    // Update dot position
    northDot.cx = x;
    northDot.cy = y;

    // Debug display
    if (debugText) {
      debugText.text = `H:${Math.round(heading)}° X:${Math.round(x)} Y:${Math.round(y)}`;
    }
  });

  // Automatically stop the sensor when the screen is off to conserve battery
  display.addEventListener("change", () => {
    display.on ? orientation.start() : orientation.stop();
  });

  orientation.start();
} else {
  // Show message if orientation sensor is not available
  if (debugText) {
    debugText.text = "No Orientation Sensor";
  }
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

  // Format time with leading zero for minutes
  let timeString = `${hours}:${zeroPad(mins)}`;
  timeDisplay.text = timeString;
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
