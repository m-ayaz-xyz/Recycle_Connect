const User = require("../models/User");
const Vendor = require("../models/Vendor");
const haversine = require("../utils/haversine");


exports.updateUserLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,

      {
        location: {
          latitude,

          longitude,

          updatedAt: new Date(),
        },
      },

      { new: true },
    );

    res.json({
      success: true,

      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updateVendorLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const vendor = await Vendor.findOneAndUpdate(
      {
        vendorId: req.user.id,
      },

      {
        shopLocation: {
          latitude,

          longitude,

          updatedAt: new Date(),
        },
      },

      {
        new: true,
      },
    );

    res.json({
      success: true,

      vendor,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


exports.getNearbyVendors = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.location.latitude) {
      return res.status(400).json({
        message: "User location not found",
      });
    }

    const vendors = await Vendor.find();

    const nearby = [];

    vendors.forEach((vendor) => {
      if (!vendor.shopLocation || vendor.shopLocation.latitude == null) {
        return;
      }

      const distance = haversine(
        user.location.latitude,

        user.location.longitude,

        vendor.shopLocation.latitude,

        vendor.shopLocation.longitude,
      );

      if (distance <= 8) {
        nearby.push({
          ...vendor.toObject(),

          distance: Number(distance.toFixed(2)),
        });
      }
    });

    nearby.sort((a, b) => a.distance - b.distance);

    res.json(nearby);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
