import moment from "moment-timezone";

export function getCurrentTimeFromCity(city: string) {
  // add '_' for cities with multiple words
  city = city.replace(" ", "_");
  const namedTimezones = moment.tz.names();
  // find the timezone of the city
  const timezoneName = namedTimezones.find((tz) => tz.includes(city));

  const formatter = new Intl.DateTimeFormat([], {
    timeZone: timezoneName,
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  // get the current time with hh:mm, no date of the city
  return formatter.format(new Date());
}
