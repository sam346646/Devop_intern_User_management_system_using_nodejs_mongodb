var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validating
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user to database
    user
        .save(user)
        .then(data => {
            res.redirect("/");
            //res.send(data) -->will send the data
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
}

//retrive and return all user/single user
exports.find = (req, res) => {
    //single user
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found the user with id" + id });
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {

            })
    }
    //all user
    else {
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while fetching" });
            });
    }
}

//update a new identified user
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id; //To get the-->id params object's id
    
    Userdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (data) {
                res.redirect(303,'/')
            }
            else {
                res.status(404).send({ message: `Can't update user with ${id}. May be not found` })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error occured while updating" });
        })
}

//Delete a user with specified user id
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't delete user with ${id}. May be not found` })
            }
            else {
                res.send({ message: "User deleted successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error occured while deleting" });
        })
}