import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-button-form",
template: `
<div class="demo-full-width margin-top margin-botton" [formGroup]="group" style="text-align:center;">
<button type="submit" mat-raised-button color="primary" [disabled]="!group.valid">{{field.label}}</button>
<button type="button" style="margin-left:5px" (click)="Cancel()" mat-raised-button color="warn">Cancelar</button>
</div>
`,
styles: []
})
export class ButtonComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
@Output() cancel: EventEmitter<any> = new EventEmitter<any>();
constructor() {}
ngOnInit() {}
Cancel() {
    this.group.reset();
}
}