const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvdw0sjfe",
  api_key: "438546898911752",
  api_secret: "GXqPofbZtFlohGfMAHhZ8RDVGus",
  secure: true,
});

module.exports = cloudinary;

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };

// module.exports = (image) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };
