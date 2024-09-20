import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignJWT } from 'jose';

import { JwtHelperService } from '@auth0/angular-jwt';

const { session } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  private secretKey = 'Danisoft2025$Dd';

  // Función para simular el login usando las credenciales del environment
  async login(email: string, password: string): Promise<boolean> {
    // Verificar credenciales del environment
    if (email === session.email && password === session.password) {
      const payload = {
        name: session.name, // Usamos el nombre de la sesión del environment
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 1 día
      };

      // Crear el JWT
      const token = await this.createJWT(payload, this.secretKey);
      localStorage.setItem('app-token', token); // Guardamos el token
      return true;
    }
    return false;
  }

  // Crear y firmar el JWT con HMAC-SHA256
  async createJWT(payload: object, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    // Crear y firmar el JWT con el algoritmo HMAC-SHA256
    const jwt = await new SignJWT(payload as any)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('2h') // Expiración de 2 horas
      .sign(secretKey);

    return jwt;
  }

  // Decodificar el JWT
  decodeJWT(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  // Verificar si el token ha expirado
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Obtener la fecha de expiración del token
  getTokenExpirationDate(token: string): Date | null {
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  // Obtener el token almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem('app-token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.logout();
    }
    return false;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('app-token');
    this.router.navigate(['/auth/login']);
  }
}
