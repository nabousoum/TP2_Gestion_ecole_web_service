import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../services/etudiant.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-etudiant',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './form-etudiant.component.html',
  styleUrls: ['./form-etudiant.component.css'],
})
export class FormEtudiantComponent {
  etudiantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService, // Inject EtudiantService
    public dialogRef: MatDialogRef<FormEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // To differentiate "Add" or "Edit" mode
  ) {
    // Initialize the form
    this.etudiantForm = this.fb.group({
      firstName: [data?.etudiant?.firstName || '', Validators.required],
      lastName: [data?.etudiant?.lastName || '', Validators.required],
      email: [data?.etudiant?.email || '', [Validators.required, Validators.email]],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.etudiantForm.valid) {
      const etudiantData = this.etudiantForm.value;

      if (this.data?.action === 'Modifier') {
        this.etudiantService.updateEtudiant(this.data.etudiant.id, etudiantData).subscribe({
          next: (response) => {
            console.log('Étudiant mis à jour :', response);
            this.dialogRef.close(response); // Return updated data
          },
          error: (err) => console.error("Erreur lors de la mise à jour de l'étudiant :", err),
        });
      } else {
        this.etudiantService.addEtudiant(etudiantData).subscribe({
          next: (response) => {
            console.log('Nouvel étudiant ajouté :', response);
            this.dialogRef.close(response); // Return new data
          },
          error: (err) => console.error("Erreur lors de l'ajout de l'étudiant :", err),
        });
      }
    }
  }
}
