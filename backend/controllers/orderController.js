const Order = require("../models/Order.js");
const User = require("../models/User.js");
const Vendor = require("../models/Vendor.js");

exports.createOrder = async (req, res) => {
  try {
    const { vendorId, materials, contactNo, pickupTime, pickupDate } = req.body;

    // console.log(req.body);

    if (!materials || materials.length === 0) {
      return res.status(400).json({
        message: "Please add at least one material",
      });
    }

    const user = await User.findById(req.user.id);

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    let total = 0;

    const orderMaterials = [];

    materials.forEach((item) => {
      const found = vendor.materials.find((m) => m.name === item.name);

      const rate = found?.rate || 0;

      total += rate * item.weight;

      orderMaterials.push({
        name: item.name,
        weight: item.weight,
        rate,
      });
    });

    const order = await Order.create({
      userId: req.user.id,
      vendorId,
      materials: orderMaterials,
      contactNo,
      pickupTime,
      pickupDate,
      totalAmount: total,
      pickupLocation: {
        latitude: user.location.latitude,
        longitude: user.location.longitude,
      },
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// exports.getVendorOrders = async (req, res) => {
//   const orders = await Order.find({
//     vendorId: req.user._id,
//   }).populate("userId", "name email");

//   res.json(orders);
// };

// exports.getVendorOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       vendorId: req.user.id,
//     }).populate("userId", "name email");

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching orders",
//       error: error.message,
//     });
//   }
// };

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    const fourHours = 4 * 60 * 60 * 1000;

    const diff = Date.now() - new Date(order.createdAt).getTime();

    if (diff > fourHours) {
      return res.status(400).json({
        success: false,
        message: "Cancellation window has expired",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getVendorOrders = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      vendorId: req.user.id,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const orders = await Order.find({
      vendorId: vendor._id,
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.acceptOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = "accepted";

  await order.save();

  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    })
      .populate({
        path: "vendorId",
        select: "shopNameEnglish shopNameHindi address username",
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
