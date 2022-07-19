import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { UserFormComponent } from "./pages/user/user-form/user-form.component";
import { ScholarityService } from "./services/scholarity/scholarity.service";
import { Scholarity } from "./models/Scholarity";
import { UserListComponent } from "./pages/user/user-list/user-list.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})



export class AppComponent {
  @ViewChild(UserFormComponent, {static: true}) form: UserFormComponent;
  constructor(
    private _scholarityService: ScholarityService
  )
  {}
  

  ngOnInit(): void {
    this.getScholarities();
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
    // {
    //   type: "input",
    //   label: "Password",
    //   inputType: "password",
    //   name: "password",
    //   validations: [
    //     {
    //       name: "required",
    //       validator: Validators.required,
    //       message: "Password Required"
    //     }
    //   ]
    // },
    // {
    //   type: "radiobutton",
    //   label: "Gender",
    //   name: "gender",
    //   options: ["Male", "Female"],
    //   value: "Male"
    // },
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
    // {
    //   type: "checkbox",
    //   label: "Accept Terms",
    //   name: "term",
    //   value: true
    // },
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
    console.log(scholarity)
    return scholarity;
  }

  submit(value: any) {}
}


