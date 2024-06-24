import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string[] = 'Bienvenue sur '.split('');
  appName = 'Food Buddy';
  @ViewChild('scroll', { static: true }) scroll!: ElementRef<HTMLDivElement>;
  lenis!: Lenis;
  scrollTrigger!: ScrollTrigger;

  scrollTriggerUpdate = () => {
    ScrollTrigger.update();
  };

  ngOnInit(): void {
    this.lenis = new Lenis({
      lerp: 0.05,
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
    });

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    ScrollTrigger.normalizeScroll(true);
  }

  ngAfterViewInit() {
    this.lenis.on('scroll', this.scrollTriggerUpdate);

    gsap.ticker.add(time => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();
    mm.add('(min-width: 800px)', () => {
      // Configurer ScrollTrigger pour utiliser Locomotive Scroll
      const sections = gsap.utils.toArray(this.scroll.nativeElement.children);

      sections.forEach((section, index: number) => {
        if (index === 0) {
          return;
        } else if (index % 2 !== 0) {
          gsap.fromTo(
            section as HTMLElement,
            {
              x: -200,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: section as HTMLElement,
                start: 'top 50%',
                end: 'center 60%',
                scrub: true,
                // markers: true,
              },
            },
          );
        } else {
          gsap.fromTo(
            section as HTMLElement,
            {
              x: 200,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: section as HTMLElement,
                start: 'top 50%',
                end: 'center 60%',
                scrub: true,
                // markers: true,
              },
            },
          );
        }
      });
    });

    ScrollTrigger.refresh();
  }

  ngOnDestroy() {
    this.lenis.destroy();
    ScrollTrigger.killAll();
  }
}
