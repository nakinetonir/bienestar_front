import { Component, OnInit, computed, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StatsStore } from '../../shared/services/stats.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private store = inject(StatsStore);
  stats = this.store.stats;
  loading = this.store.loading;
  priceLabel = computed(() => `$${this.stats().priceMonth}/month`);

  bullets = [
    {
      icon: 'psychology',
      title: 'Neurociencia y Bioneuroemoción',
      text: 'Reprograma tu mente y tus patrones para crear la realidad que deseas.'
    },
    {
      icon: 'self_improvement',
      title: 'Meditación Guiada y Yoga',
      text: 'Calma la ansiedad, silencia el ruido mental y reconecta con la sabiduría de tu cuerpo.'
    },
    {
      icon: 'favorite',
      title: 'Autoconocimiento Profundo',
      text: 'Sana tus heridas, vive tu presente con intención y construye el futuro que quieres.'
    },
    {
      icon: 'groups',
      title: 'Comunidad Real',
      text: 'No recorrerás este camino en soledad. Comparte y crece en tribu.'
    },
  ];


  ngOnInit() { this.store.load(); }

  onJoin() { this.store.join(); }
}
