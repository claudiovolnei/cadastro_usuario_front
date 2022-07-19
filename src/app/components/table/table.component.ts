import {Component, Renderer, ViewContainerRef} from '@angular/core';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'table-basic',
  styleUrls: ['table.component.css'],
  template:` 
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

<!--- Note that these columns can be defined in any order.
      The actual rendered columns are set as a property on the row definition" -->

<!-- Position Column -->
<ng-container matColumnDef="position">
  <th mat-header-cell *matHeaderCellDef> No. </th>
  <td mat-cell *matCellDef="let element"> {{element.position}} </td>
</ng-container>

<!-- Name Column -->
<ng-container matColumnDef="name">
  <th mat-header-cell *matHeaderCellDef> Name </th>
  <td mat-cell *matCellDef="let element"> {{element.name}} </td>
</ng-container>

<!-- Weight Column -->
<ng-container matColumnDef="weight">
  <th mat-header-cell *matHeaderCellDef> Weight </th>
  <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
</ng-container>

<!-- Symbol Column -->
<ng-container matColumnDef="symbol">
  <th mat-header-cell *matHeaderCellDef> Symbol </th>
  <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>`,
})
export class TableBasic {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor (){}

}

