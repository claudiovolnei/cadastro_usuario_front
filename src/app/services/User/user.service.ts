import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    public http: HttpClient,
  ) { }

  public getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/User`);
  }
  public getUser(id: any){
    return this.http.get<User>(`${environment.apiUrl}/User/${id}`);
  }

  public postSaveUser(obj: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/User`, obj);
  }

  public putSaveUser(obj: User) {
    return this.http.put<any>(`${environment.apiUrl}/User`, obj);
  }
  
  public deleteUser(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}/User/${id}`);
  }

}
