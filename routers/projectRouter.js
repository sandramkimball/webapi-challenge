const express = require('express');
const projects = require('../data/helpers/projectModel.js')

const router = express.Router();

//GET
router.get('/', (req, res)=> {
    projects.get()   
    .then(data=> {
        res.status(200).json(data);
    })
    .catch(err=> {
        console.log('Error retrieving projects:', err);
        res.status(500).json({message: 'Error retrieving projects.'})
    })
});

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

//POST
router.post('/', (req, res)=> {
    const newProj = req.body;
    projects.insert(newProj)
    if('name' === null || 'notes' === null){
        res.status(400).json({message: 'Name and notes cannot be empty.'})
    } else {
        projects.instert(newProj)
        .then(data=> {
            res.status(200).json(data);
        })
        .catch(err=> {
            console.log('Error adding action:', err);
            res.status(500).json({message: 'Error adding project.'})
        })
    }
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



//CUSTOM MIDDLEWARE
function validateProject(req, res, next){
    const valProj = req.body;
    if(valProj === null){
        res.status(400).json({message:'Missing project data.'})
    } else {
        res.status(200).json(valProj);
        next()
    }
}

function validateProjectId(req, res, next){
    const valProjId = req.params.id;
    if(valProjId === null){
        res.status(400).json({message:'Missing project id.'})
    } else if (projects.get(valProjId)){
        next();
    }else{
        res.status(401).json({message: 'Unvalidatable'});
    }
}

router.unsubscribe(validateProject);
router.unsubscribe(validateProjectId);

module.exports = router;

