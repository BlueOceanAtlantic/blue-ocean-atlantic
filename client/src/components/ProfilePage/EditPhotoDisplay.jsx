import React from "react";
import hf from "./helperFunctions";

const EditPhotoDisplay = ({ photos, deleteFunction }) => {
  return (
    <div>
      {photos.map((photo, index) => {
        return (
          <div key={index}>
            <img src={URL.createObjectURL(photo)} />
            <button
              onClick={(e) => {
                let target = hf.handleGetTargetName(e);
                deleteFunction(target);
              }}
              name={photo}
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
