import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleData } from '../models/type';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001';
  saveToken: any;

  loginHome(nome: string, senha: string){
    return this.http.post(this.apiUrl + 'login', { nome, senha });
  }

  getVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.apiUrl}/vehicles`);
  }

  getVehicleDataByVin(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, { vin });
  }
}