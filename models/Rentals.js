import { Schema, model, models } from 'mongoose';

const RentalsSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: false },
  contacts: [
    {
      landlord: { type: String, required: true },
      caretaker: { type: Number, required: true },
    },
  ],
  location: [
    {
      county: { type: String, required: true },
      subcounty: { type: String, required: true },
      estate: { type: String, required: true },
    },
  ],
  rooms: [
    {
      type: { type: String, required: true },
      number: { type: Number, required: true },
      charges: { type: Number, required: true },
    },
  ],
  description: { type: String, required: false },
  images: [{ type: String, required: true }],
});

export const Rentals = models?.Rentals || model('Rentals', RentalsSchema);
