// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
//
// cloudinary.config({
//   cloud_name: 'matrim',
//   api_key: '183547949416228',
//   api_secret: 'XIdpSQr52PYMmkBR-lSbBVec20o'
// });
//
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     var filetype = '';
//     if (file.mimetype === 'image/gif') {
//       filetype = 'gif';
//     }
//     if (file.mimetype === 'image/png') {
//       filetype = 'png';
//     }
//     if (file.mimetype === 'image/jpeg') {
//       filetype = 'jpg';
//     }
//     cb(null, 'image-' + Date.now() + '.' + filetype);
//   }
// });
// const saveFileToServer = multer({storage: storage});
//
// module.exports = {
//   saveFileToServer
// }