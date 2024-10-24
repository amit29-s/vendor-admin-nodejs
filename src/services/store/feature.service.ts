import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { STATUS_CODES } from '../../utils/constant';
import { iCreateFeature } from 'src/types/feature.type';
import Feature from '../../models/feature.model';


@Service()
export class FeatureService extends ResponseHandler {
  async createFuture(featureData: iCreateFeature) {
    try {
      
      const organization = new Feature(featureData);
      const savedOrganization = await organization.save();

      return this.responseHandler(
        savedOrganization,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async createManyFeature(vendorFeatureData: iCreateFeature[]) {
    try {
        await Feature.deleteMany({});
        const vendorFeatures = await Feature.insertMany(vendorFeatureData);

        return this.responseHandler(
            vendorFeatures,
            'Organization created successfully',
            STATUS_CODES.OK,
        );
    } catch (error: any) {
        return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getAllFeatures() {
    try {
      const Features = await Feature.find();

      return this.responseHandler(
        Features,
        'Features send successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async deleteFeatureById(id: string) {
    try {
      const deletedFeature = await Feature.findByIdAndDelete(id);
      if (!deletedFeature) {
        return this.catchErrorHandler('Organization not found', STATUS_CODES.NOT_FOUND);
      }
      return this.responseHandler(
        deletedFeature,
        'Organization deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async updateFeatureById(id: string, updateData: any) {
    console.log(updateData,'updateDataaaaaaaaaaa')
    try {
      const updatedFeature = await Feature.findByIdAndUpdate(
        id,
        { $set: updateData[0] },
        { new: true, runValidators: true } 
      );
  
      if (!updatedFeature) {
        return this.catchErrorHandler('Feature not found', STATUS_CODES.NOT_FOUND);
      }
  
      return this.responseHandler(
        updatedFeature,
        'Feature updated successfully',
        STATUS_CODES.OK
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
