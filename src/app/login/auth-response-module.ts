export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //Buradaki registered bilgisi gönderilen bilginin kullanılıp kullanılmadığına bakar.
}
