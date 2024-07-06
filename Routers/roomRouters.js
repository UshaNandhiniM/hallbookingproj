import express from 'express'
import {  createBooking, createRooms, getAllBookingDetails, getAllCustomersWithBookedData, getAllRoomDetails, getAllRoomsBookedData, getCustomerBookedTime } from '../Controllers/roomControllers.js';

const router =express.Router();

router.get('/getAllRooms',getAllRoomDetails)
router.post('/createRooms',createRooms)
router.get('/getAllBooking',getAllBookingDetails)
router.post('/createBooking',createBooking)
router.get('/getBookedRooms',getAllRoomsBookedData)
router.get('/getCustomerBookingData',getAllCustomersWithBookedData)
router.get('/getCustomerBooked',getCustomerBookedTime)


export default router;