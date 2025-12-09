// src/app/core/services/categorias.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, of } from 'rxjs';
import { Categorias } from '../interfaces/categorias';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly dbUrl = '/assets/data/database.json';

  private loadDb(): Promise<Categorias[] | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(null); // evita SSR fetch a assets
    }
    return firstValueFrom(this.http.get<Categorias[]>(this.dbUrl));
  }

  async getAll(): Promise<Categorias[]> {
    const data = await this.loadDb();
    return data ?? [];
  }

  async getById(id: number): Promise<Categorias | undefined> {
    const data = await this.loadDb();
    return data?.find(c => c.id === id);
  }
}