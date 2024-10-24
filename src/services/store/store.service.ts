import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { STATUS_CODES } from '../../utils/constant';
import { iStore } from 'src/types/store.type';
import Store from '../../models/store.model';
// import { createUserDataValidation } from '../../utils/validators/user.validations';

@Service()
export class StoreService extends ResponseHandler {
  async createStore(storeData: iStore) {
    try {
      // const { error } = createUserDataValidation(userData);
      // if (error)
      //   return this.catchErrorHandler(
      //     error?.details?.[0]?.message,
      //     STATUS_CODES.BAD_REQUEST,
      //   );
      // const isOrgAlreadyCreated = await User.findOne({
      //   email: userData?.email,
      // });
      // if (isOrgAlreadyCreated?._id)
      //   return this.catchErrorHandler(
      //     'Organization already exits with this address',
      //     STATUS_CODES.BAD_REQUEST,
      //   );
      const store = new Store(storeData);
      const savedStore = await store.save();

      return this.responseHandler(
        savedStore,
        'Store created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getStores() {
    try {
      const stores = await Store.find();
      
      return this.responseHandler(
        stores,
        'Store send successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async deleteStoreById(id: string) {
    try {
      const deleteStore = await Store.findByIdAndDelete(id);
      if (!deleteStore) {
        return this.catchErrorHandler('Organization not found', STATUS_CODES.NOT_FOUND);
      }
      return this.responseHandler(
        deleteStore,
        'Store deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  // Multiple delete by an array of MongoDB IDs
  async deleteStoreByIds(ids: string[]) {
    try {
      const deleteStores = await Store.deleteMany({ _id: { $in: ids } });
      return this.responseHandler(
        { deletedCount: deleteStores.deletedCount },
        'Stores deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
