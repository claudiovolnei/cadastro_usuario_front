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

  import { FieldConfig, Validator } from "../../field.interface";
  
  @Component({
    exportAs: "Form",
    selector: "app-form-basic",
    template: `
    <app-loader></app-loader>
    <form class="form" [formGroup]="form" (submit)="onSubmit($event)">
    <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
    </ng-container>
    </form>
    `,
    styles: []
  })
  export class FormComponent implements OnInit {
    @Input() fields: FieldConfig[] = [];
  
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    
    form: FormGroup;
  
    get value() {
      return this.form.value;
    }
    constructor(
      private fb: FormBuilder) {}
  
    ngOnInit() {
      this.form = this.createControl();
    }
  
    onSubmit(event: Event) {    
        this.submit.emit(event)
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

    editControl(values: any) {
      const fileInput = new File([values.blob], values.schoolRecords.name, { type: values.schoolRecords.format})
      this.form.setValue({
        name : values.name,
        lastname: values.lastname,
        email: values.email,
        birthDate: values.birthDate,
        scholarityId: values.scholarity.id,
        schoolRecords: fileInput
      });

      
    }

    resetControl() {
      this.form.reset()
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