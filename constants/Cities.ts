// export interface City {
//   region: string;
//   country: string;
//   gmtOffset: string;
// }

// export const cities: City[] = [
//   { region: "Hawaii", country: "USA", gmtOffset: "GMT-10" },
//   { region: "Vancouver", country: "Canada", gmtOffset: "GMT-8" },
//   { region: "Phoenix", country: "USA", gmtOffset: "GMT-7" },
//   { region: "Mexico City", country: "Mexico", gmtOffset: "GMT-6" },
//   { region: "New York", country: "USA", gmtOffset: "GMT-5" },
//   { region: "Buenos Aires", country: "Argentina", gmtOffset: "GMT-3" },
//   { region: "London", country: "UK", gmtOffset: "GMT+1" },
//   { region: "Berlin", country: "Germany", gmtOffset: "GMT+1" },
//   { region: "Johannesburg ", country: "South Africa", gmtOffset: "GMT+2" },
//   { region: "Dubai", country: "UAE", gmtOffset: "GMT+4" },
//   { region: "Islamabad", country: "Pakistan", gmtOffset: "GMT+5" },
//   { region: "Almaty ", country: "Kazakhstan", gmtOffset: "GMT+6" },
//   { region: "Bangkok", country: "Thailand", gmtOffset: "GMT+7" },
//   { region: "Jakarta", country: "Indonesia", gmtOffset: "GMT+7" },
//   { region: "Beijing", country: "China", gmtOffset: "GMT+8" },
//   { region: "Kuala Lumpur", country: "Malaysia", gmtOffset: "GMT+8" },
//   { region: "Tokyo", country: "Japan", gmtOffset: "GMT+9" },
//   { region: "Seoul", country: "South Korea", gmtOffset: "GMT+9" },
//   { region: "Sydney", country: "Australia", gmtOffset: "GMT+10" },
//   { region: "Suva", country: "Fiji", gmtOffset: "GMT+12" },
// ];

export interface City {
  name: string;
  country: string;
}

export const cities = [
  { name: "Jakarta", country: "Indonesia" },
  // { name: "Bangkok", country: "Thailand" },
  // { name: "Tokyo", country: "Japan" },
  { name: "Seoul", country: "South Korea" },
  { name: "Kuala Lumpur", country: "Malaysia" },
  // { name: "Beijing", country: "China" },
  { name: "Sydney", country: "Australia" },
]