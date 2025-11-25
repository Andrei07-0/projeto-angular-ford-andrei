import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importante para *ngIf, *ngFor, Pipes
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms'; // <--- Importante para formControl
import { RouterLink } from '@angular/router'; // <--- Importante para o botão Voltar
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle, VehicleData } from '../../models/type';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // AQUI ESTÁ O SEGREDO. SE FALTAR ALGUM DESSES, O HTML QUEBRA:
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
  vehicleData$!: Observable<VehicleData | null>; // O '!' diz que vamos inicializar depois
  searchError = false;

  ngOnInit() {
    // 1. Carregar Dropdown
    this.vehicleService.getVehicles().subscribe(res => {
      this.vehicles = res.vehicles;
      if (this.vehicles.length > 0) {
        this.selectVehicle(this.vehicles[0].id);
      }
    });

    // 2. Configurar Busca VIN
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
  }
}