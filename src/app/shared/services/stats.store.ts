import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Stats {
  members: number;
  online: number;
  admins: number;
  priceMonth: number;
}

@Injectable({ providedIn: 'root' })
export class StatsStore {
  stats = signal<Stats>({ members: 0, online: 0, admins: 1, priceMonth: 20 });
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  load() {
    this.loading.set(true);
    this.http.get<Stats>('/api/stats').subscribe({
      next: (data) => { this.stats.set(data); this.loading.set(false); },
      error: (err) => { this.error.set('No se pudo cargar'); this.loading.set(false); console.error(err); },
    });
  }

  join() {
    return this.http.post('/api/join', {}).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err),
    });
  }
}
