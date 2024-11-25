import { EmployeeService } from './../employee.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {Employee} from '../employee' 
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,MatTableModule,MatSortModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'email', 'salary'];
  dataSource =  new MatTableDataSource<Employee>();
  constructor(private employeeservice:EmployeeService){}

  employees: Employee[]=[];
  filteredEmployees: Employee[] = [];

  @ViewChild(MatSort) sort: any;

  ngAfterViewInit(): void {
    this.employeeservice.fetchAllEmployees().subscribe((data)=>{
      this.employees=data;
      this.dataSource =  new MatTableDataSource<Employee>(data);
      this.dataSource.sort = this.sort;
    })
  }

  searchEmployee(input:any){
    this.filteredEmployees=this.employees.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
     || item.email.toLowerCase().includes(input.toLowerCase()) || item.salary.toString().includes(input));
     this.dataSource =  new MatTableDataSource<Employee>(this.filteredEmployees);

  }


}
