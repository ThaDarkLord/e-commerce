const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tagData = await Tag.findAll({
    include: [{model: Product, through: ProductTag}]
  })
  res.status(200).json(tagData);
} catch (error) {
  res.status(500).json(error)
}

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((newTag) => {
    res.json(newTag)
  }).catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then((updatedTag) => {
    res.json(updatedTag)
  }).catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
  {
    where: {
      id: req.params.id
    }
  }).then((destroyTag) => {
    res.json(destroyTag)
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
