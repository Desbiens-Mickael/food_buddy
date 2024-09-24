import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})
export class DropdownMenuComponent implements OnDestroy {
  toggle = false;
  private unlisten: () => void;

  constructor(
    private eRef: ElementRef<HTMLDivElement>,
    private renderer: Renderer2,
  ) {
    this.unlisten = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        if (!this.eRef.nativeElement.contains(event.target as Node)) {
          this.toggle = false; // Ferme le menu si le clic est à l'extérieur
        }
      },
    );
  }

  ngOnDestroy() {
    this.unlisten();
  }

  handleToggle() {
    this.toggle = !this.toggle;
  }
}
