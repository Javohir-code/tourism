
app.post("/api/hotels", async (req, res) => {
    try {
      const query = "SELECT * FROM hotels";
      const { hotel_website } = req.body;
      console.log(req.body, "BODY");
      return await db.query(query, (err, result) => {
        if (err) throw err;
  
        let data = [];
        result.forEach((reg) => {
          if (hotel_website == reg.hotel_website) {
            data.push(reg);
          }
        });
        console.log(data);
        res.status(200).send(data);
      });
    } catch (error) {
      res.status(400).send("SSS");
    }
  });
  
  app.post("/api/places", async (req, res) => {
    try {
      const { place_website } = req.body;
      const query = "SELECT * FROM places";
      return await db.query(query, (err, result) => {
        if (err) throw err;
  
        let data = [];
        result.forEach((reg) => {
          if (place_website == reg.place_website) {
            data.push(reg);
          }
        });
        console.log(data);
        res.status(200).send(data);
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
  app.post("/api/hotel", async (req, res) => {
    try {
      let {
        hotel_name,
        hotel_description,
        hotel_location,
        hotel_tel,
        hotel_time,
        hotel_price,
        hotel_website,
      } = req.body;
      return await db.query(
        `INSERT INTO hotels (hotel_name, hotel_description, hotel_location, hotel_tel, hotel_time, hotel_price, hotel_website) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          hotel_name,
          hotel_description,
          hotel_location,
          hotel_tel,
          hotel_time,
          hotel_price,
          hotel_website,
        ],
        (err, result) => {
          if (err) throw err;
  
          res.status(201).send(`Inserted Hotel Id: ${result.insertId}`);
        }
      );
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  
  app.post("/api/place", async (req, res) => {
    try {
      let {
        place_name,
        place_description,
        place_location,
        place_tel,
        place_time,
        place_price,
        place_website,
      } = req.body;
      return await db.query(
        `INSERT INTO places (place_name,
              place_description,
              place_location,
              place_tel,
              place_time,
              place_price,
              place_website) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          place_name,
          place_description,
          place_location,
          place_tel,
          place_time,
          place_price,
          place_website,
        ],
        (err, result) => {
          if (err) throw err;
  
          res.status(201).send(`Inserted Hotel Id: ${result.insertId}`);
        }
      );
    } catch (error) {
      return res.status(400).send(error);
    }
  });