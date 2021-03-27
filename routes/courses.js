const express = require('express')
const course = require('../models/course')
const router = express.Router()
const Course = require("../models/course")



router.get('/', async(req,res) =>{

    try{
        const courses = await Course.find()
        res.json(courses)
    }catch(err){
        res.status(500).json({message : err.message})
    }
    
})

router.get('/:id', getCourse, (req,res)=>{
    res.send(res.course)
} )



router.post('/', async (req,res) =>{
    
    const course = new Course({
        name: req.body.name,
        id: req.body.id
    })

    try{
        const newCourse = await course.save()
        res.status(200).json(newCourse)

    }catch(error){
        res.status(400).json({message: error.message})
    }
})

router.patch('/:id', getCourse, async (req,res) =>{
    if(req.body.name!=null){
        res.course.name = req.body.name
    }

    try {
        const updateCourse = await res.course.save()
        res.json(updateCourse)

    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getCourse, async(req,res) =>{
    
    try {
        await res.course.remove()
        res.json({message: 'deleted course'})
        
    } catch (error) {
        res.status(500).json({message: err.message})
    }
})



async function getCourse(req,res, next) {

    let course
    try{
        course = await Course.findById(req.params.id)
        if(course == null){
            res.status(404).json({message: 'Cannot find course'});
            return;
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }

    res.course = course
    next()

}

/*

app.get('/api/courses', (req, res)=> {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res)=> {
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send('the course was not found')
res.send(course);
});


app.post('/api/courses',  (req,res) => {

if(!req.body.name || req.body.name.length<3){
    res.status(400).send ("Name is required and should be minimum 3 charater")
    return;
}
const course = {
    id : courses.length +1,
    name: req.params.name
};
courses.push(course);
res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send('the course was not found')

course.name = req.body.name;
res.send(course)

});

app.delete('/api/courses/:id', (req,res) =>{

const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) {
    res.status(404).send('the course was not found')
    return;
}

const index = courses.indexOf(course);

courses.splice(index,1);

res.send(course)
})
*/
module.exports = router