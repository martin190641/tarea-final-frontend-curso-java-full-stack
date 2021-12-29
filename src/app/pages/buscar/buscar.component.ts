import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Consulta } from 'src/app/_model/consulta';
import { FiltroConsultaDTO } from 'src/app/_model/filtroConsultaDTO';
import { ConsultaService } from 'src/app/_service/consulta.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private consultaService : ConsultaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni' : new FormControl(''),
      'nombreCompleto' : new FormControl(''),
      'fechaConsulta' : new FormControl()
    })
  }

  buscar(){
    let fecha = this.form.value['fechaConsulta'];
    fecha = fecha != null ? moment(fecha).format('YYYY-MM-DDTHH:mm:ss') : '';
    let dni= this.form.value['dni'];
    let nombreCompleto: string = this.form.value['nombreCompleto'];

    let filtro = new FiltroConsultaDTO(dni, nombreCompleto.toLowerCase());

    if (filtro.dni.length === 0) {
      delete filtro.dni;
    }

    if (filtro.nombreCompleto.length === 0) {
      delete filtro.nombreCompleto
    }

    if (fecha != null && fecha !== "") {
      this.consultaService.buscarFecha(fecha).subscribe(data => this.crearTabla(data));
    } else {
      //console.log(filtro);
      this.consultaService.buscarOtros(filtro).subscribe(data => this.crearTabla(data));
    }
  }

  crearTabla(data : Consulta[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verDetalle(consulta: Consulta){
    this.dialog.open(BuscarDialogoComponent, {
      data: consulta
    });
  }

}
