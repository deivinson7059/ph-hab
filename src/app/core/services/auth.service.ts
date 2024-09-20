import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const { session } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private secretKey = 'Danisoft2025$Dd';

  constructor(private router: Router) {}

  // Función para simular el login usando las credenciales del environment
  async login(email: string, password: string): Promise<boolean> {
    // Usar las credenciales definidas en el environment
    if (email === session.email && password === session.password) {
      const header = {
        alg: 'HS256',
        typ: 'JWT',
      };
      const payload = {
        name: session.name, // Usamos el nombre de la sesión del environment
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 1 día
      };

      const token = await this.generateJWT(header, payload);
      localStorage.setItem('app-token', token); // Guardamos el token bajo 'app-token'
      return true;
    }
    return false;
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('app-token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = this.decodePayload(token);
      if (payload && payload.exp > Math.floor(Date.now() / 1000)) {
        return true;
      } else {
        this.logout();
      }
    }
    return false;
  }

  // Decodificar el payload del JWT
  decodePayload(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    return JSON.parse(atob(payload));
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('app-token');
    this.router.navigate(['/auth/login']);
  }

  // Codificar en base64url (sin padding)
  base64urlEncode(data: string): string {
    return btoa(data)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Generar el JWT manualmente
  async generateJWT(header: any, payload: any): Promise<string> {
    const encodedHeader = this.base64urlEncode(JSON.stringify(header));
    const encodedPayload = this.base64urlEncode(JSON.stringify(payload));

    // Firma el token con HMAC-SHA256 usando la secretKey
    const signature = await this.sign(
      encodedHeader + '.' + encodedPayload,
      this.secretKey
    );
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  // Firmar el token con HMAC-SHA256 usando SubtleCrypto
  async sign(data: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = encoder.encode(secret);
    const dataBuffer = encoder.encode(data);

    // Importar la clave para usarla con HMAC-SHA256
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Firmar los datos
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);

    // Convertir la firma en Base64url
    return this.arrayBufferToBase64Url(signature);
  }

  // Convertir ArrayBuffer a cadena Base64Url
  arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
