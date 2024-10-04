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

// export const getCityTimezoneInfo = (gmtOffset: string) => {
//   const cityNamedTimezone = moment.tz.guess();
//   const cityTime = moment().tz(cityNamedTimezone).format("YYYY-MM-DD HH:mm:ss");
//   return {
//     cityNamedTimezone,
//     cityCurrentTime: cityTime,
//   };
// };

const ranges = [
  [15, 23], // 15:00 to 23:00
  [16, 24], // 16:00 to 24:00 (midnight)
  [21, 5],  // 21:00 to 05:00 (crossing midnight)
];

export function getOverlappedHours(ranges: [number, number][]) {
  const modifiedRanges = ranges.map(([start, end]) => start > end ? [start, end+=24] : [start, end]);
  const overlapStart = Math.max(...modifiedRanges.map(([start, _]) => start));
  const overlapEnd = Math.min(...modifiedRanges.map(([_, end]) => end));


  // return [Math.max(...modifiedRanges.map(([start, _]) => start)), Math.min(...modifiedRanges.map(([_, end]) => end))];
}

export function getOverlappingHours(ranges: number[][]) {
  let hours = new Array(24).fill(0);

  // Function to mark hours within a range as active
  function markRange(start: number, end: number) {
    if (start < end) {
      // Simple case, no wrapping around midnight
      for (let i = start; i < end; i++) {
        hours[i]++;
      }
    } else {
      // Case where range wraps around midnight
      for (let i = start; i < 24; i++) {
        hours[i]++;
      }
      for (let i = 0; i < end; i++) {
        hours[i]++;
      }
    }
  }

  // Mark hours for all ranges
  ranges.forEach(([start, end]) => markRange(start, end));
  // Number of ranges to compare against
  const numRanges = ranges.length;

  // Find the overlap
  let overlapStart = null;
  let overlapEnd = null;
  let inOverlap = false;

  for (let i = 0; i < 24; i++) {
    if (hours[i] === numRanges) {
      // Start the overlap period if not already inside one
      if (!inOverlap) {
        overlapStart = i;
        inOverlap = true;
      }
      overlapEnd = i;
    } else if (inOverlap) {
      // End the overlap when we leave a common range
      break;
    }
  }

  // If no overlap was found
  if (overlapStart === null || overlapEnd === null) {
    return null; // No overlap exists
  }

  // Return the inclusive overlap range
  return [overlapStart, (overlapEnd + 1) % 24]; 
}
