import {Component, ComponentFactoryResolver, Input, OnInit, Renderer, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'table-basic',
  styleUrls: ['table.component.css'],
  template:` 
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <ng-container [matColumnDef]="col" *ngFor="let col of displayedColumns">
      <th mat-header-cell *matHeaderCellDef>
        {{col}}
      </th>
      <td mat-cell *matCellDef="let element">
        {{element[col]}}
      </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

  </table>`,
})
export class TableBasic implements OnInit {
  @Input() dataSource: any = null;
  @Input() displayedColumns: any;

  get dataSouce() {
    return this.dataSource.getValue();
 }
  constructor (){}

  ngOnInit(): void {
    
  }

}

