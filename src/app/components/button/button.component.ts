import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-button",
template: `
<div class="demo-full-width margin-top" [formGroup]="group" style="text-align:center;margin-botton:10px">
<button type="submit" mat-raised-button color="primary" [disabled]="!group.valid">{{field.label}}</button>
</div>
`,
styles: []
})
export class ButtonComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}