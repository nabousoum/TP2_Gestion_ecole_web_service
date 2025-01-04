import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormEtudiantComponent } from '../form-etudiant/form-etudiant.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  etudiants: any[] = []; // Liste initialement vide

  constructor(private dialog: MatDialog, private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.fetchEtudiants(); // Récupérer les données depuis le back-end au démarrage
  }

  // Récupère la liste des étudiants depuis le back-end
  fetchEtudiants() {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des étudiants :', err);
      },
    });
  }

  // Ouvre le popup pour ajouter un étudiant
  openAddDialog() {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Ajouter' }, // Action pour ajouter
    });
  
    dialogRef.afterClosed().subscribe((newEtudiant) => {
      if (newEtudiant) {
        // Ajouter immédiatement l'étudiant à la liste locale sans recharger tout
        this.etudiants.push(newEtudiant);
  
        // Alternativement, si vous voulez recharger toute la liste depuis le backend :
        // this.fetchEtudiants();
      }
    });
  }
  

  // Ouvre le popup pour modifier un étudiant
  openEditDialog(etudiant: any) {
    const dialogRef = this.dialog.open(FormEtudiantComponent, {
      width: '600px',
      data: { action: 'Modifier', etudiant }, // Action pour modifier
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchEtudiants(); // Rafraîchir la liste après modification
      }
    });
  }

  // Ouvre un popup de confirmation pour supprimer un étudiant
  openDeleteDialog(etudiant: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Voulez-vous vraiment supprimer ${etudiant.firstName} ${etudiant.lastName} ?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.etudiantService.deleteEtudiant(etudiant.id).subscribe({
          next: () => {
            this.etudiants = this.etudiants.filter((e) => e.id !== etudiant.id); // Supprime l'étudiant localement
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de l\'étudiant :', err);
          },
        });
      }
    });
  }
}
