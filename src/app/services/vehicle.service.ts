import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleData } from '../models/type';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001';

  // Busca lista de veículos para o Dropdown
  getVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.apiUrl}/vehicles`);
  }

  // Busca dados específicos pelo VIN
  getVehicleDataByVin(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, { vin });
  }
}