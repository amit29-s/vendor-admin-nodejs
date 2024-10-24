import { Schema } from 'mongoose';
import { iFeatureRefId } from './feature.type';
import { iUserRefId } from './user.type';

export type iOrgRefId = Schema.Types.ObjectId;

export interface iStore {
  _id: iOrgRefId;
  image: string;
  storeName: string;
  status: 'active' | 'inactive';
  features: iFeatureRefId[];
  members: iUserRefId[];
  createdBy: iUserRefId;
  addresses: iStoreAddress[];
  storeType: string;
  contactInfo: {
    phoneNumbers: string[];
    emails: string[];
  };
  taxInfo: {
    taxIdentificationNumber: string;
  };
}

export interface iCreateStore extends Omit<iStore, '_id'> {}

export interface iStoreAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isHeadquater: boolean;
}
