const Vendor = require("../models/Vendor.js");

const { slugify } = require("../utils/slugify.js");

exports.createvendorProfile = async (req, res) => {
  const {
    shopNameEnglish,
    shopNameHindi,
    address,
    openingTime,
    closingTime,
    materials,
  } = req.body;
  console.log(req.body);

  let username = slugify(shopNameEnglish);

  const existing = await Vendor.findOne({
    username,
  });

  if (existing) {
    username = `${username}-${Date.now()}`;
  }

  const profile = await Vendor.create({
    vendorId: req.user.id,

    username,

    shopNameEnglish,

    shopNameHindi,

    address,

    openingTime,

    closingTime,

    materials,
  });

  res.status(201).json(profile);
};

exports.getVendorByUsername = async (req, res) => {
  const vendor = await Vendor.findOne({
    username: req.params.username,
  });
  // console.log(req.params.username);

  if (!vendor) {
    return res.status(404).json({
      message: "Vendor not found",
    });
  }

  res.json(vendor);
};

exports.getAllVendors = async (req, res) => {

  const vendors = await Vendor.find(
    {},
    {
      shopNameEnglish: 1,
      shopNameHindi: 1,
      address: 1,
      username: 1,
      materials: 1,
      openingTime: 1,
      closingTime: 1,
    }
  );

  res.json(vendors);
};


exports.getVendorProfile = async (req, res) => {
  const vendor = await Vendor.findOne({
    vendorId: req.user.id,
  });

  return res.status(200).json({
    profileExists: !!vendor,
    vendor,
  });
};

exports.updateVendorProfile = async (req, res) => {
  const {
    shopNameEnglish,
    shopNameHindi,
    address,
    phoneNo,
    openingTime,
    closingTime,
    materials,
  } = req.body;

  const vendor = await Vendor.findOneAndUpdate(
    {
      vendorId: req.user.id,
    },

    {
      shopNameEnglish,
      shopNameHindi,
      address,
      phoneNo,
      openingTime,
      closingTime,
      materials,
    },

     {
    returnDocument: "after",
  }
  );

  res.json(vendor);
};
