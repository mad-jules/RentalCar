import axios from "axios";

export const CarsInstanceClient = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});
