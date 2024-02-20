import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
  ) {}

  /**
   * Registra um novo usuário com o email e senha fornecidos.
   * @param credentials - Objeto contendo o email e senha do usuário.
   * @returns Uma promise que resolve com o usuário registrado ou null se houver um erro.
   */
  async register(credentials: { email: string, password: string }) {
    try {
      const { email, password } = credentials;
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user; 
    } catch (error) {
      console.error('Erro durante o registro:', error);
      return null;
    }   
  }

  /**
   * Autentica um usuário com o email e senha fornecidos.
   * @param credentials - Objeto contendo o email e senha do usuário.
   * @returns Uma promise que resolve com o usuário autenticado ou null se houver um erro.
   */
  async login(credentials: { email: string, password: string }) {
    try {
      const { email, password } = credentials;
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user; 
    } catch (error) {
      console.error('Erro durante o login:', error);
      return null;
    }   
  }

  /**
   * Desloga o usuário atualmente autenticado.
   * @returns Uma promise que resolve quando o usuário é deslogado.
   */
  logout() {
    return signOut(this.auth);
  }
}
