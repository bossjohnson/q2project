var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex'),
    getBandData = require('../getBandData.js').getBandData,
    usersBands = require('../usersBands.js');

function Magic(num, fn) {
    var args = [];
    return data => {
        args.push(data);
        if (args.length === num) fn.apply(null, args);
    }
}

router.get('/', (req, res) => {
    var bands = [];

    var magic = Magic(1, ubands => {
        knex('bands')
            .then(function(data) {
                bands = data;
                if (ubands && res.locals.user) {
                    res.locals.user.bands = ubands;
                    ubands = ubands.map(band => band.band_name);
                    bands = data.filter(band => ubands.indexOf(band.band_name) === -1);
                }
                // console.log('bands:', bands);
                res.render('bands', { // Render bands page with bands array
                    bands: bands
                });
            }).catch(err => res.render("bands", {bands: bands}));
    });
    console.log('res.locals:', res.locals);
    if (res.locals.user) {
        usersBands(res.locals.user.user_id).then(magic);
    } else {
        magic();
        console.log('no user');
    }
});

// router.get('/:band_id', (req, res, next) => {
//     var userId = req.session.passport ? req.session.passport.user.id : req.session.user_id || null;
//
//     if (!userId) { // if the user is not logged in
//         res.locals.isAdmin = false; // then they are NOT an admin anywhere
//         next();
//     } else { // otherwise, if the user is logged in
//         knex('users') // check their admin status for this band
//             .select('is_admin')
//             .first()
//             .where('users.id', 1)
//             .innerJoin('users_bands', 'users_id', 'users.id')
//             .innerJoin('bands', 'bands_id', 'bands.id')
//             .then(data => {
//                 console.log('data:', data);
//                 res.locals.isAdmin = data.is_admin; // and assign it to res.locals
//                 next();
//             }).catch(next)
//     }
// });

router.get('/:band_id', function(req, res, next) {
    console.log('the band id is:', req.params.band_id, 'woo!');
    getBandData(req.params.band_id).then(function(data) {
            res.render('band', {
                band: data
            });
        })
        .catch(next)
});

router.post('/:band_id', function(req, res, next) {
    // handle band updates here
});

module.exports = router;
