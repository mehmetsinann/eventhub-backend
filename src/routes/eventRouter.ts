import Event from "../models/event";

const express = require("express");

const eventRouter = express.Router();

// Get all events endpoint
eventRouter.get("/events", async (req: any, res: any) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Search endpoint
eventRouter.get("/events/search", async (req: any, res: any) => {
  const { query } = req.query;

  try {
    const events = await Event.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { "venue.name": { $regex: query, $options: "i" } },
            { "venue.city": { $regex: query, $options: "i" } },
            { "venue.state": { $regex: query, $options: "i" } },
            { "artists.name": { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        },
        { start_date: { $gte: new Date() } },
      ],
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get categories endpoint
eventRouter.get("/events/categories", async (req: any, res: any) => {
  try {
    const categories = await Event.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// New event endpoint
eventRouter.post("/events/new", async (req: any, res: any) => {
  try {
    const events = await Event.insertMany(req.body);
    res.json({
      message: "Events created",
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get single event endpoint
eventRouter.get("/events/:id", async (req: any, res: any) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete event endpoint
eventRouter.delete("/events/:id", async (req: any, res: any) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.json({
      message: "Event deleted",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default eventRouter;
