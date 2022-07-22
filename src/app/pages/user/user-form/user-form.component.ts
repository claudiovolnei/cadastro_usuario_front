import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/User/user.service";
import { FieldConfig, Validator } from "../../../field.interface";

@Component({
  exportAs: "userForm",
  selector: "user-form",
  template: `
  <form class="form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class UserFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  file: File;
  form: FormGroup;
  public user: User;

  get value() {
    return this.form.value;
  }
  constructor(
    private fb: FormBuilder,
    private _userService: UserService) {}

  ngOnInit() {
    this.form = this.createControl();
  }

  onSubmit(event: Event) {
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

  getFile() {
    this.fields.forEach(field => {
      if(field.type == 'fileinput')
        this.file = field.fileValue[0];
    });
  }

  convertToFieldsInUser() {
    this.user = JSON.parse(JSON.stringify(this.form.value));    
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
