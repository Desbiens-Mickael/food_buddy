import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Composant permettant de gérer les fichiers à téléverser
 *
 * @param isStandelone {boolean} - Indique si composant est utilisé seul ou dans un autre composant
 * @param isProfilePicture {boolean} - Indique si le fichier est une photo de profil
 * @param multiple {boolean} - Indique si plusieurs fichiers sont autorisés
 * @param acceptedTypes {string} - Types MIME acceptés, séparés par des virgules
 * @param fileSubmitted {EventEmitter<File[]>} - Événement émis lorsqu'un fichier est déposé
 */
@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent implements OnDestroy {
  @Input() isStandalone = true;
  @Input() isProfilePicture = false;
  @Input() multiple = true;
  @Input() acceptedTypes = '';
  @Output() fileSubmitted = new EventEmitter<File[]>();

  // Tableau contenant les fichiers et leurs URL de prévisualisation
  files: { file: File; url: string }[] = [];

  error!: string;

  // Injection du ChangeDetectorRef pour gérer manuellement la détection des changements
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Gère le dépôt de fichiers (drag & drop)
   *
   * @param event {DragEvent} - Événement de drag & drop contenant les fichiers
   */
  handleFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  /**
   * Gère le survol de fichiers (drag over)
   *
   * @param event {DragEvent} - Événement de survol de fichiers
   */
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Ouvre le sélecteur de fichiers
   *
   * @param input {HTMLInputElement} - Élément input pour ouvrir le sélecteur de fichiers
   */
  openFileSelector(input: HTMLInputElement) {
    input.click();
  }

  /**
   * Gère la sélection de fichiers à partir de l'input
   *
   * @param event {Event} - Événement de sélection de fichiers
   */
  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement; // Cast l'événement en élément HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files); // Traite les fichiers sélectionnés
    }
  }

  /**
   * Traite les fichiers (déposés ou sélectionnés)
   *
   * @param fileList {FileList} - Liste de fichiers à traiter
   */
  processFiles(fileList: FileList) {
    this.error = '';
    // Transforme la liste de fichiers en tableau
    const newFiles = Array.from(fileList).map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    // Parcours chaque fichier pour vérifier le type MIME
    for (const fileObj of newFiles) {
      if (this.acceptedTypes && !fileObj.file.type.match(this.acceptedTypes)) {
        this.error = `Le type de fichier ${fileObj.file.type} n'est pas accepté.`;
        this.files = [];
        this.cdr.detectChanges();
        return;
      }
    }

    if (!this.multiple) {
      this.files = newFiles.slice(0, 1); // Si multiple est false, ne prend que le premier fichier
    } else {
      this.files = [...this.files, ...newFiles]; // Sinon, ajoute les nouveaux fichiers à la liste existante
    }
    if (!this.isStandalone && this.files.length > 0) {
      this.fileSubmitted.emit(this.files.map(file => file.file));
    }
    this.cdr.detectChanges(); // Déclenche manuellement la détection des changements
  }

  submit() {
    this.fileSubmitted.emit(this.files.map(file => file.file));
    this.files = [];
  }

  /**
   * Supprime un fichier de la liste
   *
   * @param index {number} - Index du fichier à supprimer
   */
  deleteFile(index: number) {
    URL.revokeObjectURL(this.files[index].url); // Révoque l'URL de l'objet pour libérer la mémoire
    this.files.splice(index, 1); // Supprime le fichier de la liste
    this.cdr.detectChanges(); // Déclenche manuellement la détection des changements
  }

  ngOnDestroy() {
    this.cdr.detach();
  }
}
