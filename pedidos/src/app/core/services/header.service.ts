import { Injectable ,signal ,WritableSignal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  titulo = signal("");
  extendido: WritableSignal<boolean> = signal(false);
}