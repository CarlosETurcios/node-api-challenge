const express = require('express');
const am = require('./data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
  am.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retriving action' });
    });
});
router.post('/', (req, res) => {
  am.insert(req.body)
    .then(actions => {
      res.status(201).json({ actions });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retreving action'
      });
    });
});
router.put('/:id', (req, res) => {
  const changes = req.body;
  am.update(req.params.id, changes)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'the action could not be found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error updating action' });
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  am.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: `action ${id} was deleted`, deleted });
      } else {
        res
          .status(404)
          .json({ message: 'the action with the specified id does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'delete server error' });
    });
});
module.exports = router;
