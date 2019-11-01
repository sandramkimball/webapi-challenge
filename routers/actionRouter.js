const express = require('express');
const actions = require('../data/helpers/actionModel')

const router = express.Router();


//POST
router.post('/', (req, res)=> {
    const newAction = req.body;
    actions.insert(newAction)
    if('description' === null || 'notes' === null){
        res.status(400).json({message: 'Decription and notes cannot be empty.'})
    } else {
        actions.instert(newAction)
        .then(data=> {
            res.status(200).json(data);
        })
        .catch(err=> {
            console.log('Error adding action:', err);
            res.status(500).json({message: 'Error adding action.'})
        })
    }
});

//GET
router.get('/', (req, res)=> {
    // actions.get()   
    // .then(data=> {
        res.status(200).json(actions);
    // })
    // .catch(err=> {
    //     console.log('Error retrieving actions:', err);
    //     res.status(500).json({message: 'Error retrieving actions.'})
    // })
});
router.get('/:id', (req, res)=> {
    actions.get(req.params.id)
    .then(data=> {
        res.status(200).json(data);
    })
    .catch(err=> {
        console.log('Error retrieving actions:', err);
        res.status(500).json({message: 'Error retrieving actions.'})
    })
});

//DELETE
router.delete('/:id', (req, res)=> {
    actions.remove(req.params.id)
    .then(count=> {
        if (count > 0){
            res.status(200).json({message: `Action #${req.params.id} has been eliminated.`})
        } else {
            res.status(404).json({message: `Action #${req.params.id} survived.`})
        }
    })
    .catch(err=> {
        console.log('Error deleting action:', err);
        res.status(500).json({message: 'Error deleting action.'})
    })
});

//PUT
router.put('/:id', (req, res)=> {
    actions.update(req.params.id, req.body)
    .then(data=> {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: `${req.params.id} does not exist.`})
        }
    })
    .catch(err=> {
        console.log('Error updating action:', err);
        res.status(500).json({message: 'Error updating action.'})
    })
})



//CUSTOM MIDDLEWARE
function validateAction(req, res, next){
    const valAction = req.body;
    if(valAction === null){
        res.status(400).json({message:'Missing action data.'})
    } else {
        res.status(200).json(valUser);
        next();
    }
};

function validateActionId(req, res, next){
    const valActionId = req.params.id;
    if(valActionId === null){
        res.status(400).json({message:'Missing action id.'})
    } else if (actions.get(valActionId)){
        next();
    }else{
        res.status(401).json({message: 'Unvalidatable'});
    }
};

router.use(validateAction);
router.use(validateActionId);

module.exports = router;