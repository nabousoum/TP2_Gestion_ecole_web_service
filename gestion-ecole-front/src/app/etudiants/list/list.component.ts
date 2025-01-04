import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant.model';
import { FormEtudiantComponent } from '../form-etudiant/form-etudiant.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule, // Importez les modules nécessaires pour Angular Material
  ],
})
export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<Etudiant>(); // Utilisation de MatTableDataSource
  displayedColumns: string[] = ['id', 'name', 'email', 'actions']; // Colonnes à afficher

  constructor(
    private dialog: MatDialog,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    // Abonnement pour charger les données
    this.etudiantService.etudiants$.subscribe((etudiants) => {
      this.dataSource.data = etudiants;
    });

    this.etudiantService.loadEtudiants(); // Charger les données initiales
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Ajouter' },
    });

    dialogRef.afterClosed().subscribe((newEtudiant) => {
      if (newEtudiant) {
        this.etudiantService.addEtudiant(newEtudiant).subscribe();
      }
    });
  }

  openEditDialog(etudiant: Etudiant) {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Modifier', etudiant },
    });

    dialogRef.afterClosed().subscribe((updatedEtudiant) => {
      if (updatedEtudiant) {
        this.etudiantService.updateEtudiant(etudiant.id, updatedEtudiant).subscribe();
      }
    });
  }

  openDeleteDialog(etudiant: Etudiant) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Voulez-vous vraiment supprimer ${etudiant.firstName} ${etudiant.lastName} ?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.etudiantService.deleteEtudiant(etudiant.id).subscribe();
      }
    });
  }
}
