export const getCurrentTimeInTimezone = (timezone: string) => {
  // @params timezone in GMT format (e.g: GMT+8, GMT-3)
  const offset = parseInt(timezone.replace("GMT", ""));
  const currentDate = new Date();
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const targetTime = new Date(utcTime + offset * 3600000);
  return targetTime.toLocaleTimeString();
};

export const getGMTOffsetFromTimeZoneName = (timezoneName: string) => {
  // timezoneName: America/New_York, Asia/Kuala_Lumpur
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
