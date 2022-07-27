import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'table-basic',
  styleUrls: ['table.component.css'],
  template:` 
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
    <ng-container [matColumnDef]="col" *ngFor="let col of displayedColumns; let colIndex = index">
      <th mat-header-cell *matHeaderCellDef>
        {{ descriptionsColumns[colIndex]}}        
      </th>
      <td mat-cell *matCellDef="let element">
        {{ this.getValuesTable(element, col) }}
        <div *ngIf="col === 'schoolRecords'">
          <a mat-icon-button aria-label="Example icon-button     with  a  heart icon" (click)="this.downloadFile(element[col].id)">
            <mat-icon>download</mat-icon>
          </a>
        </div>
        <div *ngIf="colIndex+1 == descriptionsColumns.length">
          <button mat-button (click)="this.editUser(element)" color="primary">Editar</button>
          <button mat-button (click)="this.deleteUser(element)"  color="warn">Excluir</button>
        </div>
      </td>
      <td >
       
      </td>
    </ng-container>
    
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

  </table>`,
})
export class TableBasic implements OnInit {
  @Input() dataSource: any = null;
  @Input() displayedColumns: any;
  @Input() descriptionsColumns: any;

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() download: EventEmitter<any> = new EventEmitter<any>();
 
  get dataSouce() {
    return this.dataSource.getValue();
 }
  constructor (){}

  ngOnInit(): void {
    
  }

  getValuesTable(element: any, col: any) {
    if(col === 'scholarity')
      return element[col].description;
    else if(col === 'schoolRecords')
      return '';
    else
      return element[col];    
  }

  public editUser(element: any) {
    this.edit.emit(element)
  }

  public deleteUser(element: any) {
    this.delete.emit(element)
  }

  public downloadFile(element: any) {
    this.download.emit(element)
  }

}

