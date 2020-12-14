const express = require('express');
const productRouter = express.Router();
const multer = require('multer');

const {
  get_products,
  post_product,
  edit_product,
  delete_product,
  getProductByCategory,
} = require('../controllers/product.controller');

// authenitication middleware to check if the user is authorized or not
const { checkAuth } = require('../middleware/check-auth');

// filter images to be stored
const imageFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * decide where to upload and the what the name of the file will be
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

/**
 * decide the size and upload image
 */

const upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 30,
  fileFilter: imageFilter,
});

productRouter.route('/get_products').get(get_products);
productRouter
  .route('/post_product')
  .post(upload.single('productImage'), checkAuth, post_product);
productRouter
  .route('/edit_product/:product_id')
  .post(upload.single('productImage'), checkAuth, edit_product);
productRouter.get('/product_category', getProductByCategory);
productRouter.route('/delete_product/:product_id').delete(delete_product);

module.exports = productRouter;
