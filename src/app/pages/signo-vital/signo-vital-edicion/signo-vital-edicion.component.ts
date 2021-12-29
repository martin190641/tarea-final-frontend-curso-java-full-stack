import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { SignoVital } from 'src/app/_model/signoVital';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignoVitalService } from 'src/app/_service/signoVital.service';

@Component({
  selector: 'app-signo-vital-edicion',
  templateUrl: './signo-vital-edicion.component.html',
  styleUrls: ['./signo-vital-edicion.component.css']
})
export class SignoVitalEdicionComponent implements OnInit {

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;
  pacientes: Paciente[];
  pacienteSeleccionado: Paciente;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  myControlPaciente: FormControl = new FormControl();
  pacientesFiltrados$: Observable<Paciente[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signoVitalService: SignoVitalService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'paciente': this.myControlPaciente,
      'fecha': new FormControl(new Date()),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmoRespiratorio': new FormControl('')
    });

    this.listarPacientes();
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(
      map(val => this.filtrarPacientes(val)));

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.signoVitalService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup(
          {
            'id': new FormControl(data.idSignoVital),
            'paciente': new FormControl(data.paciente),
            'fecha': new FormControl(data.fecha),
            'temperatura': new FormControl(data.temperatura),
            'pulso': new FormControl(data.pulso),
            'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio)
          }
        );
      });
    }
  }

  filtrarPacientes(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(el =>
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.pacientes.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  mostrarPaciente(val: any) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  operar() {
    let signoVital = new SignoVital();
    signoVital.idSignoVital = this.form.value['id'];
    signoVital.paciente = this.form.value['paciente'];
    signoVital.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss');
    signoVital.temperatura = this.form.value['temperatura'];
    signoVital.pulso = this.form.value['pulso'];
    signoVital.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];

    if (this.edicion) {
      this.signoVitalService.modificar(signoVital).pipe(switchMap(() => {
        return this.signoVitalService.listar();
      }))
      .subscribe(data => {
        this.signoVitalService.setSignoVitalCambio(data);
        this.signoVitalService.setMensajeCambio('SE REGISTRO');
      });
    } else {
      this.signoVitalService.registrar(signoVital).pipe(switchMap(() => {
        return this.signoVitalService.listar();
      }))
      .subscribe(data => {
        this.signoVitalService.setSignoVitalCambio(data);
        this.signoVitalService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.router.navigate(['/pages/signos-vitales']);

  }

}
