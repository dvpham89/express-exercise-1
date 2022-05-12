import express from "express";
import Shop from "../models/Shop";
import shops from "../shopDatabase";

const shopRouter = express.Router();

shopRouter.get("/", (req, res) => {
  const { minRating } = req.query;
  let filteredArray: Shop[] = shops;
  if (minRating) {
    filteredArray = filteredArray.filter((shop) => {
      return shop.rating > +minRating;
    });
  }
  res.status(200).json(filteredArray);
});

shopRouter.get("/:id", (req, res) => {
  const id: number = +req.params.id;
  const foundShop: Shop | undefined = shops.find((item) => {
    return item.id === id;
  });
  if (foundShop) {
    res.status(200).json(foundShop);
  } else {
    res.status(404).json({ message: `error: Shop not found: ${id}` });
  }
});

export default shopRouter;
