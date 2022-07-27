import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Console } from "console";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "file-input",
styleUrls: ["./fileinput.component.css"],
template: `

<mat-form-field class="demo-full-width" [formGroup]="group">
<div class="myfilebrowser">
    <mat-toolbar>
      <!-- Readonly Input to show File names -->
      <input matInput [value]="filename" [formControlName]="field.name"  />
      <!-- Browse Button -->
      <button mat-flat-button color="primary">
        Procurar
      </button>
      
    </mat-toolbar>
   
      <input type="file" #file id="fileUpload" (change)="onFileChange($event)" [formControlName]="field.name"
       accept="doc/txt/pdf/*" />
       
  </div>
  <ng-container *ngFor="let validation of field.validations;"        ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(validation.name) ">   {{validation.message}}</mat-error>
      </ng-container>
</mat-form-field>
`,

styles: []
})
export class FileInputComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
file: File;
filename: string = "Selecione um histórico escolar";
constructor() {}
ngOnInit() {}

onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && !event.target.files.lengh) {
      this.field.fileValue = event.target.files;
      this.filename = this.field.fileValue[0].name
    }
  }
}