import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FoglalasDto } from './foglalas.dto';
import { Response } from 'express';

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
  postFoglalas(@Body() FoglalasDto: FoglalasDto, @Res() response: Response) {
    console.log(FoglalasDto)
    let errors = [];

    if (!FoglalasDto.name || !FoglalasDto.email || !FoglalasDto.date || !FoglalasDto.viewers || !FoglalasDto.time) {
      errors.push("Az összes mezőt ki kell tölteni");
    }

    if (!/[a-z]@[a-z]/.test(FoglalasDto.email)) {
      errors.push("Az email formátuma nem megfelelő");
    }

    if (!/^\d{2}:\d{2}$/.test(FoglalasDto.time)) {
      errors.push("Kérjük az időpontot a következő formátumban adja meg: HH:MM")
    }

    const currdate = new Date(Date.now());

    if (currdate > FoglalasDto.date) {
      errors.push("Kérjük jővőbeli időpontot adjon meg!");
    }

    if (parseInt(FoglalasDto.viewers) > 10 || parseInt(FoglalasDto.viewers) < 1) {
      errors.push("Kérjük a nézők száma 1-10 között legyen.");
    }

    if (errors.length > 0) {
      response.render('foglalas', {
        errors: errors,
        data: FoglalasDto
      })
      return;
    } else {
      response.redirect('successful');
    }
  }

  @Get('successful')
  success() {
    return "Sikeres feltöltés"
  }
}
