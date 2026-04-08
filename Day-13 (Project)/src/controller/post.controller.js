const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

// this more usefull
// const client = new ImageKit({
//   privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
// });

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image",
  });

  // Finally, if none of the above are convenient, you can use our `toFile` helper: (more usefull)
//   await client.files.upload({
//     file: await toFile(Buffer.from("my bytes"), "file"),
//     fileName: "fileName",
//   });

  res.send(file);
}

module.exports = {
    createPostController
}
