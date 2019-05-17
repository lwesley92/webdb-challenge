const router = require('express').Router();
const db = require('./projects-model.js');

// Get projects. **Postman Tested: Working**
router.get('/', (req, res) => {
    db.getProjects()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

// Get project by ID. **Postman Tested: Working**
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getById(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(400).json({ message: 'The specified project does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

// Get a project by ID, with its actions. **Postman Tested: Working**
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;

    db.getById(id)
    .then(project => {
        if(project) {
            const pActions = {...project};
            db.getProjectWithActions(id)
            .then(actions => {
                pActions.actions = actions;
                res.status(200).json(pActions)
            })
        } else {
            res.status(400).json({ message: 'The specified project does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

// Add Project. **Postman Tested: Working**
router.post('/', (req, res) => {
    const newProj = req.body;

    if(!newProj.name || !newProj.description) {
        res.status(400).json({ message: 'Please provide a name and description for this project.'})
    } else {
        db.addProject(newProj)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }  
});

// Delete Project. **Postman Tested: Working**
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.destroyProj(id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} project successfully deleted.`})
        } else {
            res.status(404).json({ message: 'The specified project does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

// Update Project. **Postman Tested: Working**
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.updateProj(id, changes)
    .then(changes => {
        if(changes) {
            res.status(200).json({ message: 'The project has been successfully updated.'})
        } else {
            res.status(404).json({ message: 'The specified project does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});


module.exports = router;