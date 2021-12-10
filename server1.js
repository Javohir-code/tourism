const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");

dotenv.config({ path: "./config/config.env" });

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("db " + db.state);
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/socket", async (req, res) => {
  let { type } = req.body;
  if (type == "apiHotels") {
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
  } else if (type == "apiPlaces") {
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
  } else if (type == "apiHotel") {
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
  } else if (type == "apiPlace") {
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

          res.status(201).send(`Inserted Place Id: ${result.insertId}`);
        }
      );
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if ((type = "bookings")) {
    try {
      let {
        first_name,
        last_name,
        msisdn,
        email,
        address,
        payment_type,
        comfort_type,
        start_date,
        end_date,
      } = req.body;
      return await db.query(
        `INSERT INTO bookings (first_name,
          last_name,
          msisdn,
          email,
          address,
          payment_type,
          comfort_type,
          start_date,
          end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          first_name,
          last_name,
          msisdn,
          email,
          address,
          payment_type,
          comfort_type,
          start_date,
          end_date,
        ],
        (err, result) => {
          if (err) throw err;

          res.status(201).send(`Inserted Booking Id: ${result.insertId}`);
        }
      );
    } catch (error) {
      return res.status(400).send(error);
    }
  } else if (type == "bookingList") {
    try {
      const query = `SELECT * FROM bookings ORDER BY book_id DESC`;
      return await db.query(query, (err, result) => {
        if (err) throw err;

        res.status(200).send(result);
      });
    } catch (error) {
      11;
      return res.status(400).send(error);
    }
  }
});

// app.post("/api/hotels", async (req, res) => {});

// app.post("/api/places", async (req, res) => {});

// app.post("/api/hotel", async (req, res) => {});

// app.post("/api/place", async (req, res) => {});

app.listen(3000, () => {
  console.log("Server is listening!");
});
