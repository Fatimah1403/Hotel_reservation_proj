const mongoose = require('mongoose');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

const User = require('../models/User');
const Image = require('../models/Images');
const authClient = require('./AuthController');

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// return;

class ImageController {
  static async getSignature(req, res) {
    const ops = await authClient.fullAdminCheck(req);
    if (ops.error) {
      return res.status(400).json({ error: ops.error });
    }
    const { accessToken } = ops;
    const timestamp = Math.round(Date.now() / 1000); // in seconds
    const privateKey = process.env.CLOUDINARY_SECRET_KEY;

    // Note: Cloudinary signature should not include the publicKey
    const signature = crypto
      .createHash('sha1')
      .update(`timestamp=${timestamp}${privateKey}`)
      .digest('hex');

    return res.status(200).json({ timestamp, signature, accessToken });
  }

  static async uploadNewImage(req, res) {
    // this procedure can only be done by the admin
    const ops = await authClient.fullAdminCheck(req);
    if (ops.error) {
      return res.status(400).json({ error: ops.error });
    }
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'Missing required attribute: file' });
    }
    const { timestamp, signature, parentFolder, subFolder } = req.body;
    if (!timestamp || !signature || !parentFolder || !subFolder) {
      return res
        .status(400)
        .json({ error: 'Missing required attributes: timestamp, signature, parentFolder, subFolder' });
    }
    const { id, accessToken } = ops;
    const admin = await User.findById(id);
    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }
    console.log({ path: req.file.path });

    try {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
        // timestamp,
        // signature,
        folder: `Hotel/${parentFolder}/${subFolder}`,
        api_key: process.env.CLOUDINARY_API_KEY,
        overwrite: true,
      });
      if (!uploadResponse) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const image = new Image({
        url: uploadResponse.secure_url,
        altText: uploadResponse.public_id,
      });
      console.log({ uploadResponse });
      // save image
      const savedImage = await image.save();
      console.log({ savedImage });
      if (!savedImage) {
        return res.status(500).json({ error: 'Internal Server Error in saving Image' });
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      return res.status(500).json({ error: 'Internal Server Error catashtophic' });
    }
    return res.status(201).json({
      message: 'Image uploaded successfully',
      // eslint-disable-next-line no-undef
      image: savedImage,
      adminData: admin,
      accessToken,
    });
  }
}

module.exports = ImageController;
