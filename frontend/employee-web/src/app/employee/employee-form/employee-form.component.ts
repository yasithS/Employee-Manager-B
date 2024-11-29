import { EmployeeService } from './../employee.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  readonly dialogRef = inject(MatDialogRef <EmployeeFormComponent>) 
  data = inject <Employee>(MAT_DIALOG_DATA);

  constructor(private employeeservice:EmployeeService){}

  addOrEditEmployee(employee:Employee){
    if(employee.id!==0){
      this.employeeservice.updateMethod(employee).subscribe({
        next:(data) =>{
          console.log("Employee Updated!! " +data.id +"_"+ data.name);
          window.location.reload();
        },
        error:(err) =>{
          console.log(err)
        }
      })
    }else{
      this.employeeservice.createEmployee(employee).subscribe({
        next:(data) =>{
          console.log("Employee Creted successfully");
          window.location.reload();
        },
        error:(err) =>{
          console.log(err)
        }

      })
    }
  }

}
