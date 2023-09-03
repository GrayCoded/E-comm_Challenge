const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Cannot Find Tags.", err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
      },
    });

    if (!category) {
      res.status(404).json({ message: 'Tag Not Found.' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: "Tag Cannot Be Created.", error: err });
  }
});


router.put('/:id', async (req, res) => {
  const tag_id = req.params.id;
  try {
    await Tag.update(req.body, {
      where: {
        id: id_tag,
      },
    });
    if (!tag_id) {
      return res.status(404).json({ message: 'Tag Not Found.' });
    }
    return res.status(200).json({ message: 'Tag Updated Successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Tag Could Not Update.' })
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(500).json({ message: 'Cannot Find Tag.', error: err })
    }
    await tag.destroy();
    res.json('Tag Deleted Successfully.');
  } catch (err) {
    res.status(500).json({ message: 'Cannot Delete Tag.', error: err });
  }

});

module.exports = router;
