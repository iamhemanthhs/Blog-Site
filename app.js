//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");





const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-hemanth:admin123@cluster0.r0twu.mongodb.net/Blogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});





const homeStartingContent = "";
const aboutContent = "Hello, my name is Hemanth and I’m a Developer. I've always obsessed with the idea of programs, because they did almost everything that I can wish them for. That’s when I decided to follow my passion and take a leap in this field!"
const aboutContent1= "And I still belive the idea that our entire Universe is just a Gigantic Computer which was turned ON when we were born and turns OFF the moment we die.";
const contactContent = "Email : iam.hemanthhs@gmail.com | Phone : +91-9448226877";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



const blogSchema = new mongoose.Schema({
  title: String,
  content: String
})


const Blog = mongoose.model("Blog", blogSchema);

const blog1 = new Blog({
  title: "What is time?",
  content: "The world remains fairly consistent at scales we can understand. But as we zoom in, and get to smaller and smaller particles – atoms, electrons and photons, we start observing apparent anomalies. Before we start digging into quantum mechanics (the science of very small things), let’s first explore a more interesting anomaly - TIME. Time is the indefinite progress of events that appears irreversible from past to present. 10 minutes to you is pretty much 10 minutes to someone else and that’s the reason we could play multiplayer games at same time. Well, Einstein took a big shit on this notion of time with his famous 1915 Theory of relativity. In it, he determined that massive objects cause a distortion in space-time, which is felt as gravity. One of the most important conclusions of this is that time moves more slowly for a fast moving observer. Also, the fast moving observer suddenly appears very heavy to the slow moving observer, and will tend to disrupt gravity around itself. When I was younger, I was a fan of TV show called 'The Flash'. But my brain wouldn’t let me enjoy the show and instead had questions to ask. 'If the dude is running very fast, does he experience things around him in slow motion?'. Einstein’s theory answers that question – The two phenomena (his speed and the relative slow speed of the world around him, aren’t mutually exclusive. In fact, even if he is gifted with ONE of those abilities, the other is pretty much implied). If the Flash was running fast enough and punched someone, the punch would feel extremely heavy to that someone.Technically, if you could sit inside a box that has extremely high gravity for a few days, you’d come out and see that a few years have elapsed outside the box. For all means and purposes, you would have “travelled” to the future, without the ability to travel back. If you built a small window into the box, you’d see everything outside happen in super-speed. Of course all this assumes you survived, because that kind of gravity will rip you to off. Ok, but what does this have to do with consciousness? Well, the fourth dimension, actually. Simply stating that spacetime can be distorted means that there’s a dimension above the current 3D space our brains can perceive. If a 3D space is a collection of many 2D spaces, then a 4D space is a collection of many 3D spaces – similar to how each frame of a movie is a separate “scene”. In the average movie, there are 29.97 frames per second. Each frame lasts for basically 1/29.97 seconds. Take the example of a bus in the real world. A bus can take you from Place A to Place B. But Place A and Place B already exist – the bus is simply a vehicle taking you there in 3D space. Similarly, your brain is a vehicle that takes you from TimePoint A to TimePoint B in 4D space – you own a something like a bus that’s simply traversing between two “times” in a predefined 4D space. Just like how the two places the bus is ferrying you between already exist, the two “time points” your brain is taking you between already exist. We don’t perceive this because our brains aren’t built to – which is why we only found out using a variety of measuring devices. Until now, humans have pretty much been doing the same thing. We can’t explain how a 4th dimension works, because we can’t comprehend it. The character’s brain wouldn’t have found the need to process the 3rd dimension, because there’s no way he can even interact with or influence the 3rd dimension."
});

const blog2 = new Blog({
  title: "My brain is a liar..",
  content: "“Consciousness is the way information feels when it is being processed by particles” explains Max Tegmark, in his seminal book, Our Mathematical Universe. One of the problems with my brain is that it tends to ask more questions than give answers. Years of trying to zero in on the right questions have made me come to realise that statements like the one Tegmark made are practically fodder for a series of new questions. From an evolutionary standpoint, there exists no practical adaptive reason for the emergence of consciousness. Most theorists posit consciousness did not evolve as an adaptation but is an exaptation (accidental resultants of other adaptations) arising as a consequence of other developments such as incremental increases in brain size or cortical rearrangement. Consciousness in this sense is simply like the blind spot in the retina, where it is not an adaption of the retina, but instead just a by-product of the way the axons in the retina are wired. But Tegmark’s statement goes one step further, in a logical soliloquy both I and most scientists can agree with: Most of what we call consciousness is a net result of our senses, plus memory of those senses. Unlike what you’ve been told in Kindergarten, the human body doesn’t just have 5 senses. There are more subtle senses that most people never really perceive, but have been experimentally proven to be critical to your functioning. For example, there are neuron sensors that sense movement to control balance and the tilt of the head. Specific kinesthetic receptors exist for detecting stretching in muscles and tendons, helping people to keep track of their limbs. Other receptors detect levels of oxygen in certain arteries of the bloodstream."
});

const blogx = [blog1]



app.get('/', function(req, res) {


  Blog.find(function(err, items) {
    if (items.length === 0) {
      Blog.insertMany(blogx, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("sucess Bruh : )");
        }
      })
      res.redirect("/")
    } else {
      res.render('home', {
        startingcontent: homeStartingContent,
        posts: items
      });
    }


  })

});



app.get('/about', function(req, res) {
  res.render('about', {
    startingcontent: aboutContent,
    startingcontent1: aboutContent1
  });
})

app.get('/sucess', function(req, res) {
  res.render('sucess')
})

app.get('/contact', function(req, res) {
  res.render('contact', {
    startingcontent: contactContent
  });
})

app.get('/compose', function(req, res) {
  res.render('compose');
})

app.post('/compose', function(req, res) {
  {{{{
    const blog = new Blog({
      title: req.body.posttitle,
      content: req.body.pastbody
    });
    blog.save()
  }}}}
  res.render('sucess')
})

app.get("/posts/:postname", function(req, res) {

  Blog.find(function(err, items) {
    let posts = items


    for (i in posts) {
      if (_.lowerCase(req.params.postname) === _.lowerCase(posts[i].title)) {

        res.render('post', {
          title: posts[i].title,
          content: posts[i].content
        });
      } else {
        console.log("error");
      }
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("All Good Bruh");
});
