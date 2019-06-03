export class Test{
    static print(){
      console.log(AuthTokenType[1]);
       console.log(AuthTokenType[AuthTokenType.RefreshToken])
    }
}


enum AuthTokenType{
  RefreshToken,
  AccessToken
}
