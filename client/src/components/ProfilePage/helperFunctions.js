const axios = require("axios");
const FormData = require("form-data");
const handleGetTargetName = (e) => e.target.name;
const handleDeleteItem = (itemToDelete, itemArray) => {
  let updatedArray = [];
  itemArray.forEach((item) => {
    if (item !== itemToDelete) {
      updatedArray.push(item);
    }
  });
  return updatedArray;
};
const handleAddItem = (itemToAdd, itemArray) => {
  if (itemArray.indexOf(itemToAdd) === -1 && itemToAdd.length > 3) {
    const revisedArray = itemArray.concat(itemToAdd);
    return revisedArray;
  }
};

const cloudinaryUpload = (files, cb) => {
  let urlArray = [];
  let promiseArray = [];
  files.forEach((file) => {
    let cloudinaryReq = new FormData();
    cloudinaryReq.append("file", file);
    cloudinaryReq.append("upload_preset", "help-me-out-upload");
    promiseArray.push(
      axios
        .post(
          "https://api.cloudinary.com/v1_1/garethssites/image/upload",
          cloudinaryReq
        )
        .then((response) => {
          urlArray.push(response.data.secure_url);
        })
    );
  });
  Promise.all(promiseArray).then(() => {
    cb(urlArray);
  });
};

module.exports = {
  handleAddItem,
  handleDeleteItem,
  handleGetTargetName,
  cloudinaryUpload,
};
