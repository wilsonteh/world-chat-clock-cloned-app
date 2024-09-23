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
