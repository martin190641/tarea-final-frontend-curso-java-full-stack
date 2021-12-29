import { Component, OnInit, ViewChild } from '@angular/core';
import { SignoVital } from 'src/app/_model/signoVital';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { SignoVitalService } from 'src/app/_service/signoVital.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signo-vital',
  templateUrl: './signo-vital.component.html',
  styleUrls: ['./signo-vital.component.css']
})
export class SignoVitalComponent implements OnInit {

  dataSource: MatTableDataSource<SignoVital>;
  displayedColumns: string[] = ['paciente', 'fecha', 'temperatura', 'pulso', 'ritmoRespiratorio', 'acciones'];
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private signoVitalService: SignoVitalService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.signoVitalService.listarPageable(0 , 10).subscribe(data => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
      });
  
      this.signoVitalService.getSignoVitalCambio().subscribe(data => {
        this.crearTabla(data);
      });
  
      this.signoVitalService.getMensajeCambio().subscribe(data => {
        this.snackBar.open(data, 'AVISO', {
          duration: 2000
        });
      });
    }
    
    validarHijos(){
      return this.route.children.length !== 0
    }
  
    eliminar(id: number){
      this.signoVitalService.eliminar(id).pipe(switchMap( ()=> {
        return this.signoVitalService.listar();
      }))
      .subscribe(data => {
        this.signoVitalService.setSignoVitalCambio(data);
        this.signoVitalService.setMensajeCambio('SE ELIMINO');
      });
    }

    crearTabla(data: SignoVital[]){
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    filtrar(e : any){
      this.dataSource.filter = e.target.value.trim().toLowerCase();
    }
  
    mostrarMas(e: any){
      this.signoVitalService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
      });
    }
}
