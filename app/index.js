import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { zeroPad, formatSteps } from "../common/utils";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";

// Update the clock every minute
clock.granularity = "minutes";

// Get elements
const timeDisplay = document.getElementById("timeDisplay");
const ampmDisplay = document.getElementById("ampm");
const stepCount = document.getElementById("stepCount");
const heartRate = document.getElementById("heartRate");
const dateElement = document.getElementById("dateDisplay");

// Initialize heart rate sensor
let hrm = new HeartRateSensor();
hrm.start();

// Update heart rate display
hrm.onreading = function () {
  heartRate.text = hrm.heartRate || "--";
};

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

  let formattedDate = `${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][todayDate.getMonth()]} ${todayDate.getDate()}`;
  dateElement.text = formattedDate;
};
