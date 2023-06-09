const {db} = require("../db");

const getInventory = async (req, res) => {
  try {
    const {lowQuantity} = req.query;
    let query = {};
    if (lowQuantity && lowQuantity.toLowerCase() === "true") {
      query = {quantity: {$lt: 100}};
    }
    const inventory = await db.inventories.find(query).toArray();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.users.find().toArray();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
};

const createOrder = async (req, res) => {
  try {
    const {item, price, quantity} = req.body;
    const latestOrder = await db.orders.findOne({}, {sort: {_id: -1}});
    const _id = latestOrder ? latestOrder._id + 1 : 1;
    const order = {
      _id: _id,
      item: item,
      price: price,
      quantity: quantity,
    };
    const result = await db.orders.insertOne(order);
    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công.",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({error: "Lỗi khi tạo đơn hàng."});
  }
};

module.exports = {
  getInventory,
  getUsers,
  createOrder,
};
