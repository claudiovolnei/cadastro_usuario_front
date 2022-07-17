import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scholarity } from 'src/app/models/Scholarity';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScholarityService {

constructor(public http: HttpClient,) { }

public getScholarities(){
  return this.http.get<Scholarity[]>(`${environment.apiUrl}/Escolaridade`);
}

}
