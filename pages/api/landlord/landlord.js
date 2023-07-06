import { mongooseConnect } from '@/lib/mongoose';
import { Rentals } from '@/models/Rentals';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      console.log('Code with id.');
    } else {
      const results = await Rentals.find();
      res.json(results);
    }
  }

  if (method === 'POST') {
    const {
      name,
      images,
      landlordContacts,
      caretakerContact,
      roomDetails,
      locationCounty,
      locationSubcounty,
      locationEstate,
      description,
    } = req.body;

    try {
      const results = await Rentals.create({
        name,
        contacts: [{ landlord: landlordContacts, caretaker: caretakerContact }],
        location: [
          {
            county: locationCounty,
            subcounty: locationSubcounty,
            estate: locationEstate,
          },
        ],
        rooms: [
          {
            type: roomDetails[0].type,
            number: roomDetails[0].number,
            charges: roomDetails[0].charges,
          },
        ],
        description,
        images,
      });
      if (results) {
        res.json(results);
      } else {
        res.json({ message: 'An error occured try again later.' });
      }
    } catch (error) {
      res.json({ message: 'An error occured try again later..' });
      console.log(error);
    }
  }

  if (method === 'DELETE') {
    try {
      res.json({ msg: req.body });
      console.log('Delete:', req.body);
    } catch (error) {
      console.log(error);
    }
  }
}
