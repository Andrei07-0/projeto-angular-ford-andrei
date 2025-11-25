import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle, VehicleData } from '../../models/type';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private vehicleService = inject(VehicleService);
  
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;

  vinSearchControl = new FormControl('');
  vehicleData$!: Observable<VehicleData | null>; 
  searchError = false;

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(res => {
      this.vehicles = res.vehicles;
      if (this.vehicles.length > 0) {
        this.selectVehicle(this.vehicles[0].id);
      }
    });

    this.vehicleData$ = this.vinSearchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(vin => {
        if (!vin) return of(null);
        this.searchError = false;
        
        return this.vehicleService.getVehicleDataByVin(vin).pipe(
          catchError(err => {
            console.error('Erro ao buscar VIN:', err);
            this.searchError = true;
            return of(null);
          })
        );
      })
    );
  }

  selectVehicle(id: any) {
    const vehicleId = Number(id);
    this.selectedVehicle = this.vehicles.find(v => v.id === vehicleId) || null;

    
    const vinMap: Record<number, string> = {
      1: '2FRHDUYS2Y63NHD22454', 
      2: '2RFAASDY54E4HDU34874', 
      3: '2FRHDUYS2Y63NHD22455', 
      4: '2RFAASDY54E4HDU34875' 
    };

    const vinCorrespondente = vinMap[vehicleId];

    if (vinCorrespondente) {
      
      this.vinSearchControl.setValue(vinCorrespondente);
    }
  }
}