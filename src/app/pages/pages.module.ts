import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialModule } from '../material/material.module';
import { BuscarDialogoComponent } from './buscar/buscar-dialogo/buscar-dialogo.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ConsultaEspecialComponent } from './consulta-especial/consulta-especial.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { EspecialidadEdicionComponent } from './especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { ExamenEdicionComponent } from './examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './examen/examen.component';
import { MedicoDialogoComponent } from './medico/medico-dialogo/medico-dialogo.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { LayoutComponent } from './layout/layout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ConsultaWizardComponent } from './consulta-wizard/consulta-wizard.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { NuevoComponent } from './login/nuevo/nuevo.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { SignoVitalComponent } from './signo-vital/signo-vital.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SignoVitalEdicionComponent } from './signo-vital/signo-vital-edicion/signo-vital-edicion.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        PdfViewerModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [
        PacienteComponent,
        MedicoComponent,
        PacienteEdicionComponent,
        MedicoDialogoComponent,
        ExamenComponent,
        ExamenEdicionComponent,
        EspecialidadComponent,
        EspecialidadEdicionComponent,
        ConsultaComponent,
        ConsultaEspecialComponent,
        ConsultaWizardComponent,
        BuscarComponent,
        BuscarDialogoComponent,
        ReporteComponent,
        LayoutComponent,
        InicioComponent,
        Not403Component,
        Not404Component,
        NuevoComponent,
        RecuperarComponent,
        TokenComponent,
        SignoVitalComponent,
        PerfilComponent,
        SignoVitalEdicionComponent,
    ],
    providers: [],
})
export class PagesModule { }
