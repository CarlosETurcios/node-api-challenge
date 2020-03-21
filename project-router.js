const express = require('express');
const router = express.Router();
const pam = require('./data/helpers/projectModel');

router.get('/', (req, res) => {
  pam
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: 'server error' });
    });
});
router.post('/', (req, res) => {
  pam
    .insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: 'server error on projects'
      });
    });
});
router.put('/:id', (req, res) => {
  //   const { id } = req.params;
  const changes = req.body;
  pam
    .update(req.params.id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: 'project with the specified id does not exits' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'projects info could not be modified' });
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pam
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res
          .status(200)
          .json({ message: `projects ${id} was deleted`, deleted });
      } else {
        res
          .status(404)
          .json({ message: 'the post with specified id does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'deleted server error' });
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pam
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});
module.exports = router;
