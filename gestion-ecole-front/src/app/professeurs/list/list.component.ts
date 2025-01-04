import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfesseurService } from '../../services/professeur.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FormProfesseurComponent } from '../form-professeur/form-professeur.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-professeurs',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProfesseursComponent implements OnInit {
  professeurs: any[] = [];

  constructor(
    private professeurService: ProfesseurService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfesseurs();
  }

  loadProfesseurs() {
    this.professeurService.getProfesseurs().subscribe({
      next: (data) => (this.professeurs = data),
      error: (err) => console.error('Erreur lors du chargement des professeurs:', err),
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(FormProfesseurComponent, {
      width: '600px',
      data: { action: 'Ajouter' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.professeurs.push(result);
      }
    });
  }

  openEditDialog(professeur: any) {
    const dialogRef = this.dialog.open(FormProfesseurComponent, {
      width: '600px',
      data: { action: 'Modifier', professeur },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.professeurs.findIndex((p) => p.id === result.id);
        if (index !== -1) {
          this.professeurs[index] = result;
        }
      }
    });
  }

  openDeleteDialog(professeur: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `Voulez-vous vraiment supprimer ${professeur.firstName} ${professeur.lastName} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.professeurService.deleteProfesseur(professeur.id).subscribe({
          next: () => {
            this.professeurs = this.professeurs.filter((p) => p.id !== professeur.id);
          },
          error: (err) =>
            console.error('Erreur lors de la suppression du professeur :', err),
        });
      }
    });
  }
}
