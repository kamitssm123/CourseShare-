var express = require('express');
var router = express.Router();

router.get('/getCourses', function(req, res, next) {
    let query = "SELECT * from courses";
    con.query(query, (err, result) => {
        if(err) throw err;
        else {
            res.send(result);
        }
    })
});

router.post('/getCourseInfo', function(req, res, next) {
    let query = "SELECT * from courses where id='"+req.body.courseId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result && result.length) {
                res.send({'status': 'success', 'courseInfo': result[0]});
            }
            else {
                res.send({'status': 'failure'});
            }
        }
    })
});

router.post('/getMyCourses', function(req, res, next) {
    let query = "SELECT * from courses where teacherId='"+req.body.teacherId+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            if(result && result.length) {
                res.send({'status': 'success', 'myCourses': result});
            }
            else {
                res.send({'status': 'empty'});
            }
        }
    })
});

router.post('/removeCourse', function(req, res, next) {
    let query = "DELETE from courses where id='"+req.body.id+"'";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            res.send({'status': 'success'});
        }
    })
});

router.post('/addCourse', function(req, res, next) {
    var course = req.body;
    let query = "INSERT into courses (name, description, teacherId, teacherName, price) VALUES ('"+course.name+"', '"+course.description+"', '"+course.teacherId+"', '"+course.teacherName+"', '"+course.price+"')";
    con.query(query, (err, result) => {
        if(err) res.send({'status': 'failure'});
        else {
            res.send({'status': 'success'});
        }
    })
})

module.exports = router;