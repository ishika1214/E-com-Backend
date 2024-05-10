import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController{
   constructor(private authService:AuthService ){}
  
   @Post("signUp")
   signup(@Body() dto:SignUpDto){
    return this.authService.signup(dto);
   }

   @HttpCode(HttpStatus.OK)
   @Post("signIn")
   signIn(@Body() dto:AuthDto){
    return this.authService.signIn(dto);
   }
}