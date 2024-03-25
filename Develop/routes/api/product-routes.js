const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category }, // Include associated Category data
        { model: Tag, through: ProductTag } // Include associated Tag data via ProductTag model
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//get one product
      router.get('/:id', async (req, res) => {
        try {
          const product = await Product.findBYPk(req.params.id,{
            include: [
              { model: Category }, // Include associated Category data
              { model: Tag, through: ProductTag } // Include associated Tag data via ProductTag model]
            ]
              });
              res.json(products);
            } catch (err) {
              console.error(err);
              res.status(500).json(err);
            }
          });



// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      await product.addTags(req.body.tagIds); // Associate tags with the product
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;