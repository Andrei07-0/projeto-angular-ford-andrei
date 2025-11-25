export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface Vehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string; // URL da imagem vindo da API
}

export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: 'on' | 'off';
  lat: number;
  long: number;
}