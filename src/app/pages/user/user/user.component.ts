import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from 'src/app/components/form/form.component';
import { FieldConfig } from 'src/app/field.interface';
import { Scholarity } from 'src/app/models/Scholarity';
import { User } from 'src/app/models/User';
import { ScholarityService } from 'src/app/services/scholarity/scholarity.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(FormComponent, {static: true}) form: FormComponent;
  
  public users: User[];
  public colunmsUser: any[] =  ['nome', 'sobrenome', 'email', 'dataNascimento', 'escolaridadeId', 'historicoEescolarId'];

  file: File;
  public user: User;
  public userDto: FormData = new FormData();

  constructor(
    private _userService: UserService
    , private _scholarityService: ScholarityService) { }

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
      name: "historicoEscolar",
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

  convertToFieldsInUser() {
    this.user = JSON.parse(JSON.stringify(this.form.value));  
    this.getFile();
    this.userDto.append("file", this.file); 
    // this.userDto.append("user", JSON.stringify(this.user)); 
    this.userDto.append('nome',this.user.name);
    this.userDto.append('sobrenome',this.user.lastname);
    this.userDto.append('email',this.user.email);
    this.userDto.append('dataNascimento',this.user.birthDate.toString());
    this.userDto.append('escolaridadeId','' + this.user.scholarityId);
     console.log(this.user, JSON.stringify(this.user), this.userDto, this.file)  
  }

  submit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.convertToFieldsInUser();
    
    if(this.file === null || this.file === undefined)
       alert('Arquivo invalido.')
    else {      
      this._userService.postSaveUser(this.userDto)
      .subscribe((res: any) => {
        alert('Sucesso ao salvar usuario!')
        
      }, (err) => {
        alert(err.error);        
    }); 
    }
  }
}
