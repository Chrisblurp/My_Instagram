import { db } from "./dexie";
import { useLiveQuery } from "dexie-react-hooks";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import getPhotoUrl from "get-photo-url";
import { useState } from "react";

export default function Gallery() {
  const allImg = useLiveQuery(() => db.gallery.reverse().toArray(), []);

  // hooks for the modal

  const  [openModal, setOpenModal] = useState(false);

  // function to add images from the gallery 
  const addNewImg = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput")
    });
  };

// function to delete a single image
  const delImg = async (id) => {
    await db.gallery.delete(id);
  };
  
// function to delete all images
  const dellAllImg = async (value) => {
   
    await  db.gallery.clear({value});
    setOpenModal(false);
    
  }

  const toggleModal = ()=>{
    setOpenModal(true);
  }
  // for the loading animation
  const loadingAnimation = (
    <div className="center">
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
  <div className="wave"></div>
</div>
  )
  return (
    <>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addNewImg}>
        <FontAwesomeIcon className="add-photo-button" icon={faPlusSquare} />
      </label>
      
      <section className="gallery">
       {!allImg?.length > 0 && <h1>You Have No Photos Available</h1> }
      {!allImg && loadingAnimation}
      
        {allImg?.map((photo) => {
          return (
            <div className="item">
              <img
                src={photo.url}
                key={photo.id}
                className="item-image"
                alt="pic1"
              />
              <button
                className="delete-button"
                onClick={() => delImg(photo.id)}
              >
                Delete
              </button>


            </div>
            
          );
        })}
        {  openModal && <Modal delAll = {dellAllImg}
        closeModal={setOpenModal}/> }
      </section>
      
      <button onClick={toggleModal}>
      DELETE ALL
      <FontAwesomeIcon className=".del-photo-button" icon={faTrashCan} />
      </button>
    
    </>
  );
}
