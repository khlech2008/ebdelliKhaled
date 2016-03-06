var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res, next) {
    res.render('data/index', {movies: req.session.data , fav: req.session.fav});
});

router.get('/addfav/:titre', function (req, res, next) {
    var data = req.session.data;
    var fav = req.session.fav;
    for (var i = 0; i < data.length; i++) {
        if (data[i].titre == req.params.titre) {
            fav.push(data[i]);
            req.session.fav = fav;
            break;
        }
    }
var fs = require('fs');
var dataJSON = JSON.stringify(fav);
fs.writeFileSync('./fav.json', dataJSON);
res.redirect('/listFavories');
})
;
router.get('/listFavories', function (req, res, next) {
    res.render('data/fav', {fav: req.session.fav});
});
router.get('/retirer/:titre', function (req, res, next) {
    var fav = req.session.fav;
    for (var i = 0; i < fav.length; i++) {
        if (fav[i].titre == req.params.titre) {
            fav.splice(i, 1);
            break;
        }
    }
    var fs = require('fs');
    var dataJSON = JSON.stringify(fav);
    fs.writeFileSync('./fav.json', dataJSON);
    res.redirect('/list');
});

router.get('/search', function (req, res, next) {
    res.render('data/result.twig');
});
router.post('/search', function (req, res, next) {
    var data = req.session.data;
    var q = req.body.q;
    var result = [];
    for (var i = 0; i < data.length; i++) {
        if (
            data[i].titre == q
        ) {
            result.push(data[i]);
        }
    }
    res.render('data/result.twig', {movies: result});
});
module.exports = router;
