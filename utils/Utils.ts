import moment from "moment-timezone";
import * as Localization from "expo-localization";

const defaultNamedTimezone = "Asia/Kuala_Lumpur";

export const getTimeFromGMTOffset = (gmtOffset: string) => {
  // gmtOffset: e.g: GMT+8, GMT-3
  const offsetPattern = /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/;
  const match = gmtOffset.match(offsetPattern);

  if (!match) {
    throw new Error("Invalid GMT offset format");
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;
  const totalMinutesOffset = sign * (hours * 60 + minutes);

  // Get current time in UTC and apply the offset
  const timeWithOffset = moment().utcOffset(totalMinutesOffset);

  // Return in hh:mm:ss A format (12-hour format with AM/PM)
  return timeWithOffset.format("hh:mm A");
};

export const getGMTOffsetFromTimeZoneName = (timezoneName: string) => {
  // timezoneName: named timezone e.g: America/New_York, Asia/Kuala_Lumpur
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneName,
    timeZoneName: "shortOffset",
  });

  const parts = formatter.formatToParts(now);
  const timeZonePart = parts.find((part) => part.type === "timeZoneName");

  if (!timeZonePart) {
    throw new Error("Time zone not found");
  }
  return timeZonePart.value;
};

export const getUserTimezoneInfo = () => {
  const userNamedTimezone =
    Localization.getCalendars()[0].timeZone || defaultNamedTimezone;
  const userTime = moment().tz(userNamedTimezone).format("YYYY-MM-DD HH:mm:ss");
  return {
    userNamedTimezone,
    userCurrentTime: userTime,
  };
};

export const getTotalHoursBetweenTimes = (
  startTime: string,
  endTime: string
) => {
  // Parse the start and end times using moment.js
  const start = moment(startTime, "h:mma");
  const end = moment(endTime, "h:mma");

  // Validate times
  if (!start.isValid() || !end.isValid()) {
    throw new Error(
      "Invalid time format. Please use the format h:mma (e.g., 11:02am, 2:50pm)."
    );
  }

  // Calculate the difference in minutes
  const duration = moment.duration(end.diff(start));
  const minutes = duration.asMinutes();

  // Convert the total minutes into hours
  const hours = minutes / 60;

  return hours;
};

export const getOverlappedHours = (ranges: number[][]) => {
  const precision = 4; // Quarter hour interval - increase for higher precision
  const numSlots = 24 * precision; // Total slots in the 24-hour period
  
  // Initialize an array for 24 hours, each hour divided into precision intervals
  let timeSlots = new Array(numSlots).fill(0);

  // Function to convert decimal time into a slot index
  function timeToSlot(time: number) {
    return Math.round(time * precision) % numSlots;
  }

  // Function to mark slots for a given range
  function markRange(start: number, end: number) {
    let startSlot = timeToSlot(start);
    let endSlot = timeToSlot(end);

    // Simple case, no wrapping around midnight
    if (startSlot < endSlot) {
      for (let i = startSlot; i < endSlot; i++) {
        timeSlots[i]++;
      }
    } 
    // Wrap around midnight
    else {
      for (let i = startSlot; i < numSlots; i++) {
        timeSlots[i]++;
      }
      for (let i = 0; i < endSlot; i++) {
        timeSlots[i]++;
      }
    }
  }

  // Mark the time slots for each range
  ranges.forEach(([start, end]) => markRange(start, end));

  const totalItems = ranges.length;
  let overlapStart = null;
  let overlapEnd = null;
  let inOverlap = false;

  // Find overlap in time slots
  for (let i = 0; i < numSlots; i++) {
    if (timeSlots[i] === totalItems) {
      if (!inOverlap) {
        overlapStart = i;
        inOverlap = true;
      }
      overlapEnd = i;
    } 
    else if (inOverlap) {
      // Exit the overlap block when we leave it
      break;
    }
  }

  // If no overlap is found
  if (overlapStart === null || overlapEnd === null) {
    return null; // No overlap
  }

  // Convert slots back to decimal time
  const startHour = (overlapStart / precision).toFixed(2);
  const endHour = ((overlapEnd + 1) / precision).toFixed(2);

  return [parseFloat(startHour), parseFloat(endHour)]; 
};

export const getHourFromAngle = (angle: number) => {
  const hour = (angle / 15 + 6) % 24;
  return hour;
};

export const getTimeStringFromHour = (hour: number) => {
  // `hour` is in decimal format (e.g., 6.5 for 6:30 AM)
  const wholeHour = Math.floor(hour);
  const minutes = (hour - wholeHour) * 60;
  return moment().hour(wholeHour).minute(minutes).format("hh:mm A");
}