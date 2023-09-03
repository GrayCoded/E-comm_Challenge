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
    console.error(err);
    res.status(500).json({ message: "Cannot find tags.", error: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
      },
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error finding tag.', error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Tag cannot be created.", error: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found.' });
    }

    await tag.update(req.body);

    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Tag could not be updated.', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found.' });
    }

    await tag.destroy();
    res.json('Tag deleted successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Tag could not be deleted.', error: err });
  }
});

module.exports = router;
