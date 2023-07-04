import { mongooseConnect } from '@/lib/mongoose';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const {
      images,
      name,
      landlordContacts,
      caretakerContact,
      roomDetails,
      loctionCounty,
      locationSubcounty,
      locationEstate,
      description,
    } = req.body;
    console.log('method', method);
    console.log('images', images);
  }
}
