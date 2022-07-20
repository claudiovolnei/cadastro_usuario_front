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
   }, error => {
     alert(' Erro ao carregar usuarios: ${error}');
     
   });
  }  

  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Nome",
      inputType: "text",
      name: "nome",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Sobrenome",
      inputType: "text",
      name: "sobrenome",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
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
      name: "dataNascimento",
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
      name: "escolaridadeId",
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
  }

  submit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.convertToFieldsInUser();
    this.getFile();
    if(this.file === null || this.file === undefined)
      return alert('Arquivo invalido.')
    else {
      let usuarioDto: FormData = new FormData;
      usuarioDto.append("file", this.file);
      
      usuarioDto.append('nome',this.user.nome);
      usuarioDto.append('sobrenome',this.user.sobrenome);
      usuarioDto.append('email',this.user.email);
      usuarioDto.append('dataNascimento',this.user.dataNascimento.toString());
      usuarioDto.append('esolaridadeId','' + this.user.esolaridadeId);
       console.log(this.user, usuarioDto, this.file)
      this._userService.postSaveUser(usuarioDto)
      .subscribe((res: any) => {
        alert('Sucesso ao salvar usuario!')
        
      }, (err) => {
        alert(err.error);        
    }); 
    }
  }
}
