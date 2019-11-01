const express = require('express');
const projects = require('../data/helpers/projectModel.js')

const router = express.Router();


//POST
router.post('/', (req, res)=> {
    const newProj = req.body;
    projects.insert(newProj)
    if('name' === null || 'notes' === null){
        res.status(400).json({message: 'Name and notes cannot be empty.'})
    } else {
        projects.insert(newProj)
        .then(data=> {
            res.status(200).json(data);
        })
        .catch(err=> {
            console.log('Error adding action:', err);
            res.status(500).json({message: 'Error adding project.'})
        })
    }
});

//GET
router.get('/', (req, res)=> {
    projects.get()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch (err => {
        console.error('Error: ', err);
        res.status(500).json({ err: 'Cannot retrieve project data' });
      });
})

router.get('/:id', (req, res)=> {
    projects.get(req.params.id)
    .then(data=> {
        res.status(200).json(data);
    })
    .catch(err=> {
        console.log('Error retrieving project:', err);
        res.status(500).json({message: 'Error retrieving project.'})
    })
});


//DELETE
router.delete('/:id', (req, res)=> {
    projects.remove(req.params.id)
    .then(count=> {
        if (count > 0){
            res.status(200).json({message: `Project #${req.params.id} has been eliminated.`})
        } else {
            res.status(404).json({message: `Project #${req.params.id} survived.`})
        }
    })
    .catch(err=> {
        console.log('Error deleting action:', err);
        res.status(500).json({message: 'Error deleting project.'})
    })
});

//PUT
router.put('/:id', (req, res)=> {
    projects.update(req.params.id, req.body)
    .then(data=> {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: `${req.params.id} does not exist.`})
        }
    })
    .catch(err=> {
        console.log('Error updating project:', err);
        res.status(500).json({message: 'Error updating project.'})
    })
})


module.exports = router;

