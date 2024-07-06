const rooms = [
    {
      id: 1,
      roomName: "Extra Small",
      noOfSeatsAvailable: 30,
      amenitiesInRoom: "Ac,Wifi,Speaker,Micro phone,Projector",
      pricePerHour: 1000,
      status: "Booked",
    },
    {
      id: 2,
      roomName: "Small",
      noOfSeatsAvailable: 60,
      amenitiesInRoom: "Ac,Wifi,Speaker,Micro phone,Projector",
      pricePerHour: 1500,
      status: "Booked",
    },
    {
      id: 3,
      roomName: "Mediun",
      noOfSeatsAvailable: 120,
      amenitiesInRoom: "Ac,Wifi,Speaker,Micro phone,Projector",
      pricePerHour: 2000,
      status: "Booked",
    },
    {
      id: 4,
      roomName: "Large",
      noOfSeatsAvailable: 240,
      amenitiesInRoom: "Ac,Wifi,Speaker,Micro phone,Projector",
      pricePerHour: 2500,
      status: "Available",
    },
    {
      id: 5,
      roomName: "Extra Large",
      noOfSeatsAvailable: 500,
      amenitiesInRoom: "Ac,Wifi,Speaker,Micro phone,Projector",
      pricePerHour: 3000,
      status: "Avilable",
    },
  ];
  
  const bookings = [
    {
      bookingId: 1,
      customerName: "John",
      bookedDate: new Date("2024-02-24"),
      eventDate: "2024-06-23",
      startTime: "10:00 Am",
      endTime: "01:00 Pm",
      roomId: 1,
    },
    {
      bookingId: 2,
      customerName: "Dino",
      bookedDate: new Date("2024-04-24"),
      eventDate: "2024-07-22",
      startTime: "09:00 Am",
      endTime: "01:00 Pm",
      roomId: 2,
    },
    {
      bookingId: 3,
      customerName: "Thomas",
      bookedDate: new Date("2024-04-18"),
      eventDate: "2024-06-17",
      startTime: "09:00 Am",
      endTime: "05:00 Pm",
      roomId: 3,
    },
  ];
  
  //Get all Rooms or GET Method
  export const getAllRoomDetails = (req, res) => {
    res.status(200).json({ message: "Room Details", data: rooms });
  };
  
  //create Rooms or POSt Method
  export const createRooms = (req, res) => {
    const {
      roomName,
      noOfSeatsAvailable,
      amenitiesInRoom,
      pricePerHour,
      status,
    } = req.body;
    const newRoom = {
      id: rooms.length + 1,
      roomName: roomName,
      noOfSeatsAvailable: noOfSeatsAvailable,
      amenitiesInRoom: amenitiesInRoom,
      pricePerHour: pricePerHour,
      status: status,
    };
    rooms.push(newRoom);
    res.status(200).json({ message: "Room Created Successfully", data: newRoom });
  };
  
  //get all Bookings or GET Method
  export const getAllBookingDetails = (req, res) => {
    res.status(200).json({ message: "Booking Details", data: bookings });
  };
  
  //create Bookings or POST Method
  export const createBooking = (req, res) => {
    const { customerName, eventDate, startTime, endTime, roomId } = req.body;
    const existingBooking = bookings.find(
      (booking) =>
        booking.roomId === roomId &&
        booking.eventDate === eventDate &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime))
    );
    if (existingBooking) {
      return res.status(404).json({ message: "Room is already booked" });
    }
    const newBooking = {
      bookingId: bookings.length + 1,
      customerName: customerName,
      bookedDate: new Date().toISOString().split('T')[0], // ISO format date,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      roomId: roomId,
    };
    bookings.push(newBooking);
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      // console.log("Current room status:", room.status);
      room.status = "Booked";
      // console.log("Updated room status:", room.status);
    }
    res
      .status(200)
      .json({ message: "Room booked successfully", data: newBooking });
  };
  
  //list all rooms with booked data /GET method
  export const getAllRoomsBookedData = (req, res) => {
    const bookedRooms = rooms.filter((room) => room.status === "Booked");
    res
      .status(200)
      .json({ message: "Details of rooms which is booked", data: bookedRooms });
  };
  
  //List all customers with Booked data /GET method
  export const getAllCustomersWithBookedData = (req, res) => {
    const customerBooking = bookings.map((booking) => {
      const room = rooms.find((room) => room.id === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room.roomName,
        date: booking.eventDate,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
    });
    res
      .status(200)
      .json({ message: "Customer With Booked data", data: customerBooking });
  };
  
  //List how many times a customer has booked the rooms
  export const getCustomerBookedTime = (req, res) => {
    const { customerName } = req.query;
    const customerBookings = bookings.filter(
      (booking) => booking.customerName === customerName
    );
    if (customerBookings.length === 0) {
      return res.status(404).json({message:"No bookings found for this customer"});
    }
    const bookingDetails = customerBookings.map((booking) => {
      const room = rooms.find((room) => room.id === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room.roomName,
        date: booking.eventDate,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.bookingId,
        bookingDate: booking.bookedDate.toISOString().split('T')[0], // ISO format date,
        bookingStatus: room.status
      };
    });
    res.status(200).json({
      message: "Customer bookings details",
      data: bookingDetails,
    });
  };
  
  