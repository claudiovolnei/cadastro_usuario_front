import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SchoolRecordsService {

constructor(public http: HttpClient,) { }
public getSchoolRecords(schoolRecords: any){

  return this.http.post<File>(`${environment.apiUrl}/SchoolRecords/file`,schoolRecords).toPromise();
}
}
