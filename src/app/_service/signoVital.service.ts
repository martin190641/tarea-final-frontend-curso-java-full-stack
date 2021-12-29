import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignoVital } from '../_model/signoVital';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignoVitalService extends GenericService<SignoVital> {

  private signoVitalCambio: Subject<SignoVital[]> = new Subject<SignoVital[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http, `${environment.HOST}/signoVital`);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getSignoVitalCambio(){
    return this.signoVitalCambio.asObservable();
  }

  setSignoVitalCambio(lista: SignoVital[]){
    this.signoVitalCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj);
  }
}
