export interface City {
  region: string;
  country: string;
  timezone: string;
}

export const cities: City[] = [
  { region: "Hawaii", country: "USA", timezone: "GMT-10" },
  { region: "Vancouver", country: "Canada", timezone: "GMT-8" },
  { region: "Phoenix", country: "USA", timezone: "GMT-7" },
  { region: "Mexico City", country: "Mexico", timezone: "GMT-6" },
  { region: "New York", country: "USA", timezone: "GMT-5" },
  { region: "Buenos Aires", country: "Argentina", timezone: "GMT-3" },
  { region: "London", country: "UK", timezone: "GMT+0" },
  { region: "Berlin", country: "Germany", timezone: "GMT+1" },
  { region: "Johannesburg ", country: "South Africa", timezone: "GMT+2" },
  { region: "Dubai", country: "UAE", timezone: "GMT+4" },
  { region: "Islamabad", country: "Pakistan", timezone: "GMT+5" },
  { region: "Almaty ", country: "Kazakhstan", timezone: "GMT+6" },
  { region: "Bangkok", country: "Thailand", timezone: "GMT+7" },
  { region: "Jakarta", country: "Indonesia", timezone: "GMT+7" },
  { region: "Beijing", country: "China", timezone: "GMT+8" },
  { region: "Kuala Lumpur", country: "Malaysia", timezone: "GMT+8" },
  { region: "Tokyo", country: "Japan", timezone: "GMT+9" },
  { region: "Seoul", country: "South Korea", timezone: "GMT+9" },
  { region: "Sydney", country: "Australia", timezone: "GMT+10" },
  { region: "Suva", country: "Fiji", timezone: "GMT+12" },
];
