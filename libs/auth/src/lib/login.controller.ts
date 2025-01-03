import { LoginResult, LoginService } from '@rline/type';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SessionId } from './decorator/session-id.decorator';
import { MessageResultDto } from './dto/message.dto';
import { LoginWithSSODto } from './dto/login-with-sso.dto';
import { PublicResource, ResourceName } from '@rline/rest';
import { LoginResultDto } from './dto/login-result.dto';

@ResourceName('auth')
@ApiTags(LoginController.name)
@Controller('auth')
export class LoginController {
  constructor(protected readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: LoginResultDto })
  @PublicResource()
  @Post('login')
  login(@Body() body: LoginDto): Promise<LoginResultDto> {
    return this.loginService.login(body);
  }

  @ApiOperation({ summary: 'Loging with sso' })
  @ApiOkResponse({ type: LoginResultDto })
  @PublicResource()
  @Post('logint-with-sso')
  loginWithSSO(@Body() body: LoginWithSSODto): Promise<LoginResultDto> {
    return this.loginService.loginWithSSO(body);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ type: MessageResultDto })
  @Post('logout')
  logout(@SessionId() sessionId: number): Promise<MessageResultDto> {
    return this.loginService.logout(sessionId);
  }

  @ApiOperation({ summary: 'Logout all ( devices )' })
  @ApiOkResponse({ type: MessageResultDto })
  @Post('logout-all')
  logoutAll(@SessionId() sessionId: number): Promise<MessageResultDto> {
    return this.loginService.logoutAll(sessionId);
  }
}
