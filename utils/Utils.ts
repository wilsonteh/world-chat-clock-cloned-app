export const getCurrentTimeInTimezone = (timezone: string) => {
  const offset = parseInt(timezone.replace("GMT", ""));
  const currentDate = new Date();
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const targetTime = new Date(utcTime + offset * 3600000);
  return targetTime.toLocaleTimeString();
};
