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
              opacity: 5,
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

    gsap.from('.step', {
      opacity: 0,
      duration: 0.5,
      stagger: 0.5,
      ease: 'back',
      scrollTrigger: {
        trigger: '.step',
        start: 'top 50%',
        end: 'center 60%',
        // markers: true,
      },
      x: 200,
    });

    const titles: HTMLElement[] = gsap.utils.toArray('.poec-title');
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: titles[0], // Déclenchement de l'animation basé sur le premier élément
        start: 'top 50%',
        end: 'center 60%',
      },
    });

    // Animation des éléments .initial en premier
    masterTl.from(
      titles.map(title => title.querySelector('.initial')),
      {
        opacity: 0,
        duration: 0.3,
        ease: 'back',
        x: 100,
        stagger: 0.3, // Ajuster le temps de décalage entre chaque .initial
      },
    );

    // Ensuite, ajouter des timelines pour chaque groupe de titres
    titles.forEach(title => {
      const word = title.querySelector('.word');
      const text = title.nextElementSibling;

      const tl = gsap.timeline();
      tl.from(
        word,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'back',
          x: -100,
        },
        'wordsAndTexts', // Etiquette de position commune
      ).from(
        text,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'back',
          x: 100,
        },
        'wordsAndTexts', // Même étiquette pour garantir une animation simultanée
      );

      masterTl.add(tl);
    });

    ScrollTrigger.refresh();
  }

  ngOnDestroy() {
    this.lenis.destroy();
    ScrollTrigger.killAll();
  }
}
