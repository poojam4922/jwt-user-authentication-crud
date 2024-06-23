const Tutorial = require("../models/tutorial");
const User = require("../models/user");

exports.createTutorial = async (req, res) => {
  
  try {
    const tutorial = await Tutorial.create({
      title: req.body.title,
      body: req.body.body,
      creator: req.uid,
    })

    //connected tutorials with the user
    const user = await User.findById(req.uid)
    console.log(user)
    if (user) {
      const tutorials = [...user.tutorials, tutorial.id]
      await user.updateOne({ tutorials })

      return res.status(201).send({ success: true, tutorial })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}
exports.findAll = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate(
      "creator",
      "firstname lastname email"
    );
    return res.status(200).send({ tutorials });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// exports.findOne = async (req, res) => {
//   try {
//     const tutorial = await Tutorial.findById(req.params.id)
//     console.log(tutorial,"tutorial");

//     if (!tutorial) {
//       return res.status(404).json({ message: "Tutorial not found" });
//     }

//     res.send({ tutorial });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.update = async (req, res) => {
//   console.log(req.params.id,"pooja")
//   try {
//     const tutorial = await Tutorial.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (tutorial.creator.toString() !== req.user.id) {
//       return res.status(403).send("You are not allowed to edit this tutorial");
//     }

//     tutorial.title = req.body.title || tutorial.title;
//     tutorial.body = req.body.body || tutorial.body;
//     await tutorial.save();
//     res.status(200).send(tutorial);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

exports.update = async (req, res) => {
  try {
    const editTutorial = await Tutorial.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )

    if (!editTutorial) {
      return res.status(404).json({message: 'Tutorial not found'})
    }

    return res.status(200).send({ success: true, tutorial: editTutorial })
  } catch (err) {
      res.status(500).json({ error: err })
  }
}

exports.delete = async (req, res) => {
  try {
    const tutorial = await Tutorial.findOneAndDelete({
      _id: req.params.id,
  
    });

    console.log(tutorial)
 
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found or you are not allowed to delete it" });
    }

    res.status(200).send('Tutorial deleted');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
