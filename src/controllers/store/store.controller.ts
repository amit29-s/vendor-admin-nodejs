import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Res,
  } from 'routing-controllers';
  import { StoreService } from '../../services/store/store.service';
  import { Response } from 'express';
  import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';
import { iStore } from 'src/types/store.type';
  
  @JsonController('/store')
  export class OrganisationController {
    constructor(
      private StoreService: StoreService,
      private responseService: ResponseHandler,
    ) {}
  
    @Post('/createStore')
    async createStore(@Body() organization: iStore, @Res() res: Response) {
      const data = await this.StoreService.createStore(organization);
      return this.responseService.apiResponseHandler(res, data);
    }

    @Get('/getStores')
    async getStoreList(@Res() res: Response) {
        const data = await this.StoreService.getStores();
        return this.responseService.apiResponseHandler(res, data);
    }

    @Delete('/deleteStore/:id')
    async deleteStore(@Param('id') id: string, @Res() res: Response) {
      console.log(id,'lkjasdflkjsadfkljsadflksjadflksdjfkl')
      const data = await this.StoreService.deleteStoreById(id);
      return this.responseService.apiResponseHandler(res, data);
    }
  
    @Delete('/deleteStores')
    async deleteStores(@Body() ids: { ids: string[] }, @Res() res: Response) {
      const data = await this.StoreService.deleteStoreByIds(ids.ids);
      return this.responseService.apiResponseHandler(res, data);
    }
  
  }
  