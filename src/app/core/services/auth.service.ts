import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const { session } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private tokenKey = 'app-token';
  private expireKey = 'token-expire';

  // Función para simular el login usando las credenciales del environment
  async login(email: string, password: string): Promise<boolean> {
    // Verificar credenciales del environment
    if (email === session.email && password === session.password) {
      // Generar un token aleatorio
      const token = this.generateToken();
      // Calcular la fecha de expiración (en 24 horas)
      const expireDate = this.generateExpirationDate(24);

      // Guardar el token y la fecha de expiración en localStorage
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.expireKey, expireDate.toString());

      return true;
    }
    return false;
  }

  // Generar un token aleatorio
  private generateToken(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 32; // Longitud del token
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Generar la fecha de expiración (en horas)
  private generateExpirationDate(hours: number): number {
    const now = new Date();
    return now.getTime() + hours * 60 * 60 * 1000; // Convertir horas a milisegundos
  }

  // Verificar si el token es válido y si no ha expirado
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expire = localStorage.getItem(this.expireKey);

    if (token && expire) {
      const expireDate = parseInt(expire, 10);
      const now = new Date().getTime();

      // Comprobar si la fecha actual está antes de la fecha de expiración
      if (now < expireDate) {
        return true;
      } else {
        this.logout(); // Si ha expirado, eliminamos el token
      }
    }

    return false;
  }

  // Cerrar sesión y eliminar el token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expireKey);
    this.router.navigate(['/auth/login']);
  }
}
