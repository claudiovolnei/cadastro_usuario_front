import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    public http: HttpClient,
  ) { }

  public getUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/Usuario`);
  }
  public getUser(id: any){
    return this.http.get<User>(`${environment.apiUrl}/Usuario/${id}`);
  }

  public postSaveUser(obj: User) {
    return this.http.post<any>(`${environment.apiUrl}/Usuario`, obj);
  }

  public putSaveUser(obj: User) {
    return this.http.put<any>(`${environment.apiUrl}/Usuario`, obj);
  }
  
  public deleteUser(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}/Usuario/${id}`);
  }

}
