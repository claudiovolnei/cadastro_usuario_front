import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule,
MatTableModule,
MatToolbarModule,
} from "@angular/material";
@NgModule({
imports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule,
MatTableModule,
MatToolbarModule,
],
exports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule,
MatTableModule,
MatToolbarModule
]
})
export class MaterialModule {}