import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Res,
} from 'routing-controllers';
import { Response } from 'express';
import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';
import { FeatureService } from '../../services/store/feature.service';
import { iCreateFeature } from '../../types/feature.type';

@JsonController('/feature')
export class FeatureController {
  constructor(
    private FeatureService: FeatureService,
    private responseService: ResponseHandler,
  ) {}
  @Post('/createFeature')
  async createFeature(@Body() feature: iCreateFeature, @Res() res: Response) {
    const data = await this.FeatureService.createFuture(feature);
    return this.responseService.apiResponseHandler(res, data);
  }

  @Post('/createManyFeature')
    async createManyVendorFeature(@Body() features: iCreateFeature[], @Res() res: Response) {
        const data = await this.FeatureService.createManyFeature(features);
      return this.responseService.apiResponseHandler(res, data);
    }

  @Get('/getAllFeatures')
  async getAllFeatures(@Res() res: Response) {
    const data = await this.FeatureService.getAllFeatures();
    console.log(data,'dataaaaa')
    return this.responseService.apiResponseHandler(res, data);
  }

  @Delete('/deleteFeature/:id')
  async deleteFeature(@Param('id') id: string, @Res() res: Response) {
    const data = await this.FeatureService.deleteFeatureById(id);
    return this.responseService.apiResponseHandler(res, data);
  }

  @Put('/updateFeature/:id')
  async updateFeature(
    @Param('id') id: string,
    @Body() updateData: any,
    @Res() res: Response,
  ) {
    const data = await this.FeatureService.updateFeatureById(id, updateData);
    return this.responseService.apiResponseHandler(res, data);
  }
}
