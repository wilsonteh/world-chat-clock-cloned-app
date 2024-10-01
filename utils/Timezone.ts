import moment from "moment-timezone";
import * as Localization from "expo-localization";

export function getTimezoneFromCity(city: string) {
  city = city.replace(" ", "_");
  const namedTimezones = moment.tz.names();
  const found = namedTimezones.find((tz) => tz.includes(city));
  if (!found) {
    throw new Error(`Timezone not found for city: ${city}`);
  }
  return found;
}

export function getCurrentTimeFromCity(city: string) {
  const timezone = getTimezoneFromCity(city);
  const formatter = new Intl.DateTimeFormat([], {
    timeZone: timezone,
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    // second: "numeric",
  });
  return formatter.format(new Date());
}

export function isTimeZoneSame(city: string) {
  const userTimezone = Localization.getCalendars()[0].timeZone || "";
  city = city.replace(" ", "_");
  return userTimezone.includes(city);
}

export function getHourDifferenceFromUser(timezone: string) {
  const userTimezone = Localization.getCalendars()[0].timeZone || "Asia/Kuala_Lumpur";
  const userCurrentTime = moment.tz(userTimezone);
  const selectedCityCurrentTime = moment.tz(timezone);

  const hoursDifference = userCurrentTime.utcOffset() - selectedCityCurrentTime.utcOffset();
  return hoursDifference / 60;
}