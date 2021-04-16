import React from "react";
import hf from "./helperFunctions";

const EditPhotoDisplay = ({ photos, deleteFunction }) => {
  return (
    <div>
      {photos.map((photo, index) => {
        console.log(typeof photo);
        return (
          <div key={index}>
            <img src={photo} />
            <button
              onClick={(e) => {
                let target = hf.handleGetTargetName(e);
                deleteFunction(target);
              }}
              name={index}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditPhotoDisplay;
