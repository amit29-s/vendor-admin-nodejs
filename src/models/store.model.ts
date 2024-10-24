import mongoose, { Schema } from 'mongoose';
import {
  iStore,
  iStoreAddress,
} from 'src/types/store.type';

const AddressSchema = new Schema<iStoreAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
  },
});

const OrganizationSchema = new Schema<iStore>(
  {
    image : {
      type : String,
      required : true,
    },
    storeName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    addresses: {
      type: [AddressSchema], // Array of addresses for the organization's headquarters or office locations
    },
    features: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Feature', // Links to the employees under this organization
      }], // Features available to the organization (enabled by Core Organisation for vendors)
    },
    storeType: {
      type: String, // Optional field to specify the industry (e.g., e-commerce, retail)
    },
    contactInfo: {
      phoneNumbers: [
        {
          number: String,
          isPrimary: Boolean,
        },
      ],
      emails: [
        {
          number: String,
          isPrimary: Boolean,
        },
      ],
    },
    taxInfo: {
      taxIdentificationNumber: {
        type: String, // Optional tax registration number
      },
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Links to the employees under this organization
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Link to the Core Admin or employee who created the organization
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  },
);

const Store = mongoose.model('Organization', OrganizationSchema);
export default Store;
