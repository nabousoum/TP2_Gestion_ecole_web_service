import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-etudiant',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatButtonModule, MatCardModule,MatDialogModule,MatIconModule,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './form-etudiant.component.html',
  styleUrl: './form-etudiant.component.css'
})
export class FormEtudiantComponent {
  etudiantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormEtudiantComponent>
  ) {
    this.etudiantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.etudiantForm.valid) {
      console.log('Données soumises :', this.etudiantForm.value);
      this.dialogRef.close(); // Ferme le popup après soumission
    }
  }

}
