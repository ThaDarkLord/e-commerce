const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(catData)
  } catch (error) {
    res.status(500).json({message: 'nothing found utlizing that ID!'})
  }
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((newCategory) => {
    res.json(newCategory)
  }).catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then((updatedCategory) => {
    res.json(updatedCategory)
  }).catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
   where: { id: req.params.id
   },
  }).then((destroyCategory) => {
    res.json(destroyCategory)
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
