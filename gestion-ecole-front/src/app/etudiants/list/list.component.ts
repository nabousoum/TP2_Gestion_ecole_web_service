import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormEtudiantComponent } from '../form-etudiant/form-etudiant.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  etudiants = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' },
  ];

  constructor(private dialog: MatDialog) {}

  // Ouvre le popup pour ajouter un étudiant
  openAddDialog() {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Ajouter' }, // Ajouter une action
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.etudiants.push(result); // Ajouter un nouvel étudiant
      }
    });
  }

  // Ouvre le popup pour modifier un étudiant
  openEditDialog(etudiant: any) {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Modifier', etudiant }, // Ajouter une action et les données
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.etudiants.findIndex(e => e.id === result.id);
        if (index !== -1) {
          this.etudiants[index] = result; // Mettre à jour les informations de l'étudiant
        }
      }
    });
  }

  openDeleteDialog(etudiant: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Voulez-vous vraiment supprimer ${etudiant.firstName} ${etudiant.lastName} ?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.etudiants = this.etudiants.filter(e => e.id !== etudiant.id); // Supprime l'étudiant
      }
    });
  }

  ngOnInit(): void {}
}
