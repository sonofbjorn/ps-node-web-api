var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function(app) {

    // Create
    app.post('/cat', function(req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during cat create',
                    error: err
                });
            }
            res.json({
                info: 'cat created successfully'
            });
        });
    });

    // Read
    app.get('/cat', function(req, res) {
        Cat.find(function(err, cats) {
            if (err) {
                res.json({
                    info: 'error during find cats',
                    error: err
                });
            }
            res.json({
                info: 'cats found successfully',
                data: cats
            });
        });
    });

    app.get('/cat/:id', function(req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({
                    info: 'error during find cat',
                    error: err
                });
            }
            if (cat) {
                res.json({
                    info: 'found your cat',
                    data: cat
                });
            } else {
                res.json({
                    info: 'no cat found'
                });
            }
        });
    });

    // Update
    app.put('/cat/:id', function(req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({
                    info: 'error during find cat',
                    error: err
                });
            }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during update cat',
                            error: err
                        });
                    }
                    res.json({
                        info: 'cat updated successfully'
                    });
                });
            } else {
                res.json({
                    info: 'cat not found'
                });
            }
        });
    });

    // Delete
    app.delete('/cat/:id', function(req, res) {
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove cat'
                });
            }
            res.json({
                info: 'cat removed successfully'
            });
        });
    });
}