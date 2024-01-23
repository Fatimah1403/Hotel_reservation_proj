const roomsData = [
    {
      title: 'Deluxe Suite',
      maxPeople: 2,
      desc: 'A spacious and luxurious suite with modern amenities.',
      roomNumbers: [{ number: 101, unavailableDates: [] }, { number: 102, unavailableDates: [] }],
      hotel: 1, // Foreign key for Hotel 1
    },
    {
      title: 'Executive Room',
      maxPeople: 2,
      desc: 'An executive room designed for comfort and style.',
      roomNumbers: [{ number: 201, unavailableDates: [] }, { number: 202, unavailableDates: [] }],
      hotel: 1, // Foreign key for Hotel 1
    },
    // ... Add 8 more rooms for Hotel 1
  
    // Rooms for Hotel 2
    {
      title: 'Mountain View Cabin',
      maxPeople: 4,
      desc: 'A cozy cabin with stunning mountain views.',
      roomNumbers: [{ number: 301, unavailableDates: [] }, { number: 302, unavailableDates: [] }],
      hotel: 2, // Foreign key for Hotel 2
    },
    {
      title: 'Riverside Retreat Suite',
      maxPeople: 3,
      desc: 'A suite with a view overlooking the serene riverside.',
      roomNumbers: [{ number: 401, unavailableDates: [] }, { number: 402, unavailableDates: [] }],
      hotel: 2, // Foreign key for Hotel 2
    },
    
    {
      title: 'Business Class Studio',
      maxPeople: 2,
      desc: 'A modern studio designed for business travelers.',
      roomNumbers: [{ number: 1501, unavailableDates: [] }, { number: 1502, unavailableDates: [] }],
      hotel: 15, // Foreign key for Hotel 15
    },
    {
      title: 'Luxury Penthouse',
      maxPeople: 4,
      desc: 'Experience luxury in this spacious penthouse suite.',
      roomNumbers: [{ number: 1601, unavailableDates: [] }, { number: 1602, unavailableDates: [] }],
      hotel: 15, 
    },
   
  ];
  
  
  