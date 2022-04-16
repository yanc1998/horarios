import {Body, Controller, Param, Post, Request, Response, UseGuards} from '@nestjs/common';
import {ProcessResponse} from 'src/shared/core/utils/processResponse';
import {RegisterDto} from '../application/dtos/register.dto';
import {LocalAuthGuard} from '../application/Guards/LocalAythGuard';
import {LoginUseCase} from '../application/useCase/auth.login.use-case';
import {RegisterUseCase} from '../application/useCase/auth.register.use-case';
import {UserMapper} from "../../user/infra/mappers/user.mappers";
import {ConfirmRegisterUseCase} from "../application/useCase/auth.confirm.register.use-case";

@Controller('Auth')
export class AuthController {
    constructor(private readonly authRegister: RegisterUseCase, private readonly authLogin: LoginUseCase, private readonly confirmRegister: ConfirmRegisterUseCase) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async Login(@Request() req, @Response() res) {
        const login = await this.authLogin.execute(req.user);
        return ProcessResponse.setResponse(res, login, (a) => a);
    }

    @Post('register')
    async Register(@Body() userDto: RegisterDto, @Response() res) {
        const user = await this.authRegister.execute(userDto);
        return ProcessResponse.setResponse(res, user, UserMapper.DomainToDto);
    }

    @Post('confirm-register/:token')
    async ConfirmRegister(@Param('token') token: string, @Response() res) {
        const user = await this.confirmRegister.execute({token: token});
        return ProcessResponse.setResponse(res, user, UserMapper.DomainToDto);
    }

}