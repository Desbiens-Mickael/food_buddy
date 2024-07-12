import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-card-merchant',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card-merchant.component.html',
  styleUrls: ['./product-card-merchant.component.css'],
})
export class ProductCardMerchantComponent implements OnDestroy {
  @Input() product!: FullProduct;
  @Input() establishmentId!: string;

  private productService = inject(ProductService);
  private router = inject(Router);

  text = '';
  startX!: number;
  initialLeft!: number;
  isDragging = false;
  maxOffset!: number;
  actionTriggered = false;
  middleDiv: HTMLElement | null = null;
  holdStartTime: number | null = null;
  TIMER = 700;

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id, this.establishmentId);
    console.log(this.product.id, this.establishmentId);
  }

  onMouseDown(event: MouseEvent) {
    this.startX = event.pageX;
    this.middleDiv = (event.target as HTMLElement)
      .closest('.button')
      ?.querySelector('.card') as HTMLElement | null;

    if (this.middleDiv) {
      this.initialLeft =
        parseFloat(getComputedStyle(this.middleDiv).transform.split(',')[4]) ||
        0;
      this.maxOffset = parseFloat(getComputedStyle(this.middleDiv).width) / 3;
      this.isDragging = true;
      this.actionTriggered = false;
      this.holdStartTime = Date.now();
      this.middleDiv.classList.remove('transition');

      this.middleDiv.addEventListener('mousemove', this.onMouseMove);
      this.middleDiv.addEventListener('mouseup', this.onMouseUp);
      this.middleDiv.addEventListener('mouseleave', this.onMouseLeave);
    }
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].pageX;
    this.middleDiv = (event.target as HTMLElement)
      .closest('.button')
      ?.querySelector('.card') as HTMLElement | null;

    if (this.middleDiv) {
      this.initialLeft =
        parseFloat(getComputedStyle(this.middleDiv).transform.split(',')[4]) ||
        0;
      this.maxOffset = parseFloat(getComputedStyle(this.middleDiv).width) / 3;
      this.isDragging = true;
      this.actionTriggered = false;
      this.holdStartTime = Date.now();
      this.middleDiv.classList.remove('transition');

      this.middleDiv.addEventListener('touchmove', this.onTouchMove);
      this.middleDiv.addEventListener('touchend', this.onTouchEnd);
      this.middleDiv.addEventListener('touchcancel', this.onTouchEnd);
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || !this.middleDiv) return;

    const deltaX = event.pageX - this.startX;
    const newLeft = Math.min(
      Math.max(this.initialLeft + deltaX, -this.maxOffset),
      this.maxOffset,
    );

    const parentElement = this.middleDiv.parentElement;
    if (parentElement && !this.actionTriggered) {
      const currentTime = Date.now();
      if (
        this.holdStartTime &&
        currentTime - this.holdStartTime >= this.TIMER
      ) {
        if (deltaX > parentElement.clientWidth * 0.25) {
          this.actionTriggered = true;
          void this.router.navigate([
            '/merchant/establishment',
            this.establishmentId,
            'edit-product',
            this.product.id,
          ]);
        }
        if (deltaX < parentElement.clientWidth * -0.25) {
          this.deleteProduct();
          this.actionTriggered = true;
        }
      }
    }
    this.middleDiv.style.transform = `translateX(${newLeft.toString()}px)`;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || !this.middleDiv) return;

    const touchX = event.touches[0].pageX;
    const deltaX = touchX - this.startX;
    const newLeft = Math.min(
      Math.max(this.initialLeft + deltaX, -this.maxOffset),
      this.maxOffset,
    );

    const parentElement = this.middleDiv.parentElement;
    if (parentElement && !this.actionTriggered) {
      const currentTime = Date.now();
      if (
        this.holdStartTime &&
        currentTime - this.holdStartTime >= this.TIMER
      ) {
        if (deltaX > parentElement.clientWidth * 0.25) {
          this.actionTriggered = true;
          void this.router.navigate([
            '/merchant/establishment',
            this.establishmentId,
            'edit-product',
            this.product.id,
          ]);
        }
        if (deltaX < parentElement.clientWidth * -0.25) {
          this.deleteProduct();
          this.actionTriggered = true;
        }
      }
    }
    this.middleDiv.style.transform = `translateX(${newLeft.toString()}px)`;
  }

  onMouseUp() {
    this.resetCard();
  }

  onMouseLeave() {
    this.resetCard();
  }

  onTouchEnd() {
    this.resetCard();
  }

  resetCard() {
    if (!this.isDragging || !this.middleDiv) return;

    this.holdStartTime = null;
    this.middleDiv.classList.add('transition');
    this.middleDiv.style.transform = 'translateX(0px)';

    this.middleDiv.removeEventListener('mousemove', this.onMouseMove);
    this.middleDiv.removeEventListener('mouseup', this.onMouseUp);
    this.middleDiv.removeEventListener('mouseleave', this.onMouseLeave);
    this.middleDiv.removeEventListener('touchmove', this.onTouchMove);
    this.middleDiv.removeEventListener('touchend', this.onTouchEnd);
    this.middleDiv.removeEventListener('touchcancel', this.onTouchEnd);

    setTimeout(() => {
      this.middleDiv?.classList.remove('transition');
      this.actionTriggered = false;
    }, 300);

    this.isDragging = false;
  }

  ngOnDestroy() {
    if (this.middleDiv) {
      this.middleDiv.removeEventListener('mousemove', this.onMouseMove);
      this.middleDiv.removeEventListener('mouseup', this.onMouseUp);
      this.middleDiv.removeEventListener('mouseleave', this.onMouseLeave);
      this.middleDiv.removeEventListener('touchmove', this.onTouchMove);
      this.middleDiv.removeEventListener('touchend', this.onTouchEnd);
      this.middleDiv.removeEventListener('touchcancel', this.onTouchEnd);
    }
  }
}
