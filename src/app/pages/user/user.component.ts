import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from 'src/app/components/form/form.component';
import { FieldConfig } from 'src/app/field.interface';
import { Scholarity } from 'src/app/models/Scholarity';
import { User } from 'src/app/models/User';
import { ScholarityService } from 'src/app/services/scholarity/scholarity.service';
import { SchoolRecordsService } from 'src/app/services/schoolRecords/schoolRecords.service';

import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(FormComponent, {static: true}) form: FormComponent;
  
  public users: User[];
  public colunmsUser: any[] =  ['name', 'lastname', 'email', 'birthDate', 'scholarity', 'schoolRecords', 'actions'];
  public descriptionsColumns: any[] =  ['Nome', 'Sobrenome', 'Email', 'Data Nascimento', 'Escolaridade', 'Histórico Escolar', 'Acões'];

  file: File;
  public user: User;

  constructor(
    private _userService: UserService
    , private _scholarityService: ScholarityService
    , private _schoolRecordsService: SchoolRecordsService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
  this._userService.getUsers().subscribe(
    (res: User[]) => {
      this.users = res;
   }, (err) => {
     alert(`Erro ao carregar usuarios`);
     
   });
  }  

  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Nome",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        }
      ]
    },
    {
      type: "input",
      label: "Sobrenome",
      inputType: "text",
      name: "lastname",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        }
      ]
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "date",
      label: "Data Nascimento",
      name: "birthDate",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Data de nascimento obrigatório"
        }
      ]
    },
    {
      type: "select",
      label: "Escolaridade",
      name: "scholarityId",
      value: null,
      collections: this.getScholarities(),
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Escolaridade obrigatório!"
        }
      ]
    },
    {
      type: "fileinput",
      label: "Histórico Escolar",
      name: "schoolRecords",
      inputType: "file",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Histórico escolar obrigatório"
        }
      ]
    },
    {
      type: "button",
      label: "Salvar"
    }
  ];

  public getScholarities(): any[] {
    let scholarity = [];
    this._scholarityService.getScholarities()
      .subscribe((res: Scholarity[]) => {        
        res.forEach(element => {
          scholarity.push(element)
        });
        
      }, () => {
        alert('Erro ao obter escolaridades')
    });    
    return scholarity;
  }

  getFile() {
    this.regConfig.forEach(field => {
      if(field.type == 'fileinput')
        this.file = field.fileValue[0];
    });
  }

  convertToFieldsInUser(): any {
    this.user = JSON.parse(JSON.stringify(this.form.value));  

    let userDto = new FormData(); 
    userDto.append("file", this.file); 
    userDto.append('name',this.user.name);
    userDto.append('lastname',this.user.lastname);
    userDto.append('email',this.user.email);
    userDto.append('birthDate',this.user.birthDate.toString());
    userDto.append('scholarityId','' + this.user.scholarityId);
    console.log(this.user, this.file, userDto)
    
    return userDto;
  }

  submit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.getFile();
    
    if(this.file === null || this.file === undefined)
       alert('Arquivo invalido.')
    else {      
      this._userService.postSaveUser(this.convertToFieldsInUser())
      .subscribe((res: any) => {
        alert('Usuário adicionado!')
      }, (err) => {
        alert(err.error);        
      },
      () => {
        this.getUsers();        
        this.form.resetControl()
      }); 
    }
  }

  public async edit(event:any){
    //  event.file = await this._schoolRecordsService.getSchoolRecords(event.schoolRecords);
      

    console.log(event)
    this.form.editControl(event)
    console.log(this.form)
  }

  delete(props: any) {
    if (confirm(`Deseja remover ${props.name} ?` ) == true) {
      this._userService.deleteUser(props.id)
        .subscribe((res) => {
          alert(res)                 
        }, (err) => {
          alert(err.error);        
        },
        () => {
          this.getUsers(); 
        }); 
    }
  }

  download(id: any){
    window.open(`${environment.apiUrl}/schoolRecords/${id}`, '_blank')      
  }
}
