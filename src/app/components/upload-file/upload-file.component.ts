import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent {
  @Input() multiple = true; // Propriété pour définir si plusieurs fichiers sont autorisés
  @Input() acceptedTypes = ''; // Propriété pour définir les types MIME acceptés
  @Output() fileDropped = new EventEmitter<FileList>(); // Événement émis lorsqu'un fichier est déposé
  @Output() errorOccurred = new EventEmitter<string>(); // Événement émis lorsqu'une erreur se produit

  files: { file: File; url: string }[] = []; // Tableau contenant les fichiers et leurs URL de prévisualisation

  constructor(private cdr: ChangeDetectorRef) {} // Injection du ChangeDetectorRef pour gérer manuellement la détection des changements

  // Méthode pour gérer le dépôt de fichiers
  handleFileDrop(event: DragEvent) {
    event.preventDefault(); // Empêche le comportement par défaut du navigateur
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processFiles(event.dataTransfer.files); // Traite les fichiers déposés
    }
  }

  // Méthode pour gérer le survol de fichiers (drag over)
  handleDragOver(event: DragEvent) {
    event.preventDefault(); // Empêche le comportement par défaut du navigateur
  }

  // Méthode pour ouvrir le sélecteur de fichiers
  openFileSelector(input: HTMLInputElement) {
    input.click(); // Simule un clic sur l'élément input pour ouvrir le sélecteur de fichiers
  }

  // Méthode pour gérer la sélection de fichiers via le sélecteur
  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement; // Cast l'événement en élément HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files); // Traite les fichiers sélectionnés
    }
  }

  // Méthode pour traiter les fichiers (déposés ou sélectionnés)
  processFiles(fileList: FileList) {
    const newFiles = Array.from(fileList)
      .filter(file => {
        if (this.acceptedTypes && !file.type.match(this.acceptedTypes)) {
          this.errorOccurred.emit(
            `Le type de fichier ${file.type} n'est pas accepté.`,
          );
          return false;
        }
        return true;
      })
      .map(file => ({
        file,
        url: URL.createObjectURL(file),
      }));

    if (!this.multiple) {
      this.files = newFiles.slice(0, 1); // Si multiple est false, ne prend que le premier fichier
    } else {
      this.files = [...this.files, ...newFiles]; // Sinon, ajoute les nouveaux fichiers à la liste existante
    }
    if (newFiles.length > 0) {
      this.fileDropped.emit(fileList); // Émet l'événement fileDropped avec la liste de fichiers
    }
    this.cdr.detectChanges(); // Déclenche manuellement la détection des changements
  }

  // Méthode pour supprimer un fichier de la liste
  deleteFile(index: number) {
    URL.revokeObjectURL(this.files[index].url); // Révoque l'URL de l'objet pour libérer la mémoire
    this.files.splice(index, 1); // Supprime le fichier de la liste
    this.cdr.detectChanges(); // Déclenche manuellement la détection des changements
  }
}
