const multer = require("multer");

const pictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/pictures/')
    },
    filename: function (req, file, cb) {
        const mext = file.mimetype.split('/')
        const ext = `.${mext[1]}`
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})


const uploadPicture = multer({ storage: pictureStorage })







const fileFilter = (req, file, cb) =>    {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:
    cb(null, false)
  
    // To accept the file pass `true`, like so:
    cb(null, true)
  
    // You can always pass an error if something goes wrong:
    cb(new Error('I don\'t have a clue!'))
  
  }

  module.exports = {
    uploadPicture,
  }