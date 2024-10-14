import { Body, Controller, Get, Post, Render, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { FoglalasDto } from './foglalas.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('foglalas')
  @Render('foglalas')
  getFoglalas() {
    return {
      data: [],
      errors: []
    }
  }

  @Post('foglalas')
  postFoglalas(@Body() FoglalasDto: FoglalasDto, @Response() response: Response) {
    let errors = [];

    if (!FoglalasDto.name || !FoglalasDto.email || FoglalasDto.date || FoglalasDto.viewers) {
      errors.push("Az összes mezőt ki kell tölteni");
    }

    if ("/[A-Z]@[1-2]/" != FoglalasDto.email) {
    }

  }
}
