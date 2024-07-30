import { Router } from 'express';
import { createAvailability, createRoomAvail, deleteAvailability, deleteRoomAvail, getAvailability, updateAvailability, updateRoomAvail } from '../controllers/availabilityController';



const router: Router = Router();
// Routes for Room
router.post('/roomAvail', createRoomAvail);
router.put('/roomAvail/:roomId', updateRoomAvail);
router.delete('/roomAvail/:roomId', deleteRoomAvail);

// Routes for Availability
router.post('/availability/:id', createAvailability);
router.put('/availability/:id', updateAvailability);
router.delete('/availability/:id', deleteAvailability);
router.get('/availability/:id', getAvailability);


export default router;
