import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../login/user-model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponse } from "../login/auth-response-module";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = environment.api_key;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
  }

  login(email: string, password: string | number) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }

  register(email: string, password: string | number) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }


  private handleUser(email:string, localId:string, idToken:string, expiresIn:string) {
    // observable, subject => rxjs
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000))

    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );

    this.user.next(user) // Buraya yazdığım bilgi sayesinde login işlemini Subject etmiş oluruz.

    localStorage.setItem("user", JSON.stringify(user)) // bunu bu şekilde Json türün de set etmemizin sebebi string türde bir değer istemesidir.
  }


  private handleError(err: HttpErrorResponse) {
    let message = "hata oluştu";


    if(err.error.error) {
     switch(err.error.error.message) {
       case "EMAIL_EXISTS":
         message = "Bu email adresi zaten kullanılıyor."
         break;
       case "TOO_MANY_ATTEMPTS_TRY_LATER":
         message = "Bir süre bekleyip tekrar deneyiniz"
         break;
       case "EMAIL_NOT_FOUND":
         message = "Email adresi bulunamadı";
         break;
       case "INVALID_PASSWORD":
         message = "Hatalı Parola";
         break;
     }
   }

    return throwError( () => message ) // Bu şekilde hata mesajını geri göndermiş oluruz.
  }


}
