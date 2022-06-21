const express = require("express");
const bodyParser = require("body-parser");
const News = require("../models/news");

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/getAllnews", function (req, res) {
  // get all data
  News.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got news");
      res.send(docs);
    }
  });
});

router.get("/getOneById", function (req, res) {
  // const date = req.body.date;
  // console.log(date);
  // const date1 = date.toISOString().split("T")[0];
  // console.log(date1);

  // get data only of particular id at first
  News.findById({ _id: req.body.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got news");
      // res.send(docs);
      const date = docs.date;
      console.log(date);
      const date1 = date.toISOString().split("T")[0];
      console.log(date1);
    }
  });
});

router.get("/getOneByAKey", function (req, res) {
  // get data only of particular property at first
  News.findOne({ author: req.body.author }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got news");
      res.send(docs);
    }
  });
});

router.get("/getMany", function (req, res) {
  // get data only of particular property at first
  News.find({ author: req.body.author }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got news");
      res.send(docs);
    }
  });
});

router.post("/post", (req, res) => {
  console.log("post");

  let news = new News({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    date: req.body.date, // split into two array and take only first element of index 0
  });

  let promise1 = news.save();
  promise1.then((news) => {
    console.log("news posted");
    res.send(news);
  });
});

router.patch("/updateOneById", (req, res) => {
  console.log("update");

  // update according to _id
  News.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        res.send(docs);
      }
    }
  );
});

router.patch("/updateOneByAKey", (req, res) => {
  console.log("update");

  // update according to a key
  News.findOneAndUpdate(
    { author: req.body.author },
    {
      $set: {
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        res.send(docs);
      }
    }
  );
});

router.patch("/updateMany", (req, res) => {
  console.log("update");

  // update according to a key
  News.updateMany(
    { author: req.body.author },
    {
      $set: {
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        res.send(docs);
      }
    }
  );
});

router.delete("/deleteOneById", (req, res) => {
  console.log("delete");

  News.findByIdAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

// findOneAndDelete or deleteOne
router.delete("/deleteOneByAKey", (req, res) => {
  console.log("delete");

  News.findOneAndDelete({ author: req.body.author }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

router.delete("/deleteMany", (req, res) => {
  console.log("delete");

  console.log(req.body);
  console.log(req.body.author);

  News.deleteMany({ author: req.body.author }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

router.delete("/deleteAll", (req, res) => {
  console.log("delete");

  News.deleteMany(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

/////////////////////////////////////
// news portal ejs

router.get("/postNewsForm", (req, res) => {
  res.render("postNews");
});

router.post("/postNews", (req, res) => {
  console.log("postNews");

  let news = new News({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    date: req.body.date, // split into two array and take only first element of index 0
  });

  let promise1 = news.save();
  promise1.then((news) => {
    console.log("news posted");
    // res.send(news);
    res.redirect("/getNews");
  });
});

router.get("/displayNews", (req, res) => {
  res.render("displayNews");
});

router.get("/getNews", function (req, res) {
  // get all data
  News.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got news");
      // res.send(docs);
      res.render("displayNews", { datas: docs });
    }
  });
});

router.get("/deleteNews/:id", (req, res) => {
  console.log("delete");
  console.log(req.params);
  console.log(req.params.id);

  News.findByIdAndDelete({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      // res.send(docs);
      res.redirect("/getNews");
    }
  });
});

router.get("/updateNewsForm/:id", (req, res) => {
  console.log("update");

  // update according to _id
  News.findById(
    { _id: req.params.id },

    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "update this news");
        // res.send(docs);
        res.render("updateNews", { data: docs });
      }
    }
  );
});

router.post("/updateNews", (req, res) => {
  console.log("update");

  // update according to _id
  News.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        author: req.body.author,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        // res.send(docs);
        res.redirect("/getNews");
      }
    }
  );
});

router.get("/displayDetails/:id", (req, res) => {
  console.log("details");
  console.log(req.params);
  console.log(req.params.id);

  News.findByIdAndDelete({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      // res.send(docs);
      res.render("details");
    }
  });
});

module.exports = router;
