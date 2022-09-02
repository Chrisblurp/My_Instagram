import { useState, useEffect } from "react";
import profileIcon from "../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";
import { db } from "./dexie";
import { useLiveQuery } from "dexie-react-hooks";

export default function Bio() {


  // declaring the bio details to hold the dexiestate hook
const bioDetails = useLiveQuery(()=> db.bio.toArray(),[])
 
  // declaring the various constants to hold the useState hooks
  const [isUpdate, setIsUpdate] = useState(false);
  const [getProfilePhoto, setGetProfilePhoto] = useState(profileIcon);

  // useeffect hook for the profile photo
  useEffect(() => {
    const setDataFromDb = async () => {
      const getProfilePhotoFromDb = await db.bio.get("profilePhoto");
      getProfilePhoto && setGetProfilePhoto(getProfilePhotoFromDb);
    };
    setDataFromDb();
  });



  // Updating the various use states hook to hold actual event value

  const updateBioDetails = async (event) => {
    event.preventDefault();
    const objectData = {
      name: event.target.updateName.value,
      about: event.target.updateAbout.value
    };

    // setBioDetails(objectData);
    setIsUpdate(false);

    await db.bio.put(objectData,"info");

  };

  const updateProfilePic = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setGetProfilePhoto(newProfilePhoto);

    await db.bio.put(newProfilePhoto, "profilePhoto");
  };
  // declaring the edit button
  const editButton = (
    <button
      onClick={(e) => {
        setIsUpdate(true);
      }}
    >
      Edit
    </button>
  );
//  declaring the cancel b utton
  const cancelButton = (
    <button
      onClick={(e) => {
        setIsUpdate(false);
      }}
      type="button"
      className="cancel-button"
    >
      Cancel
    </button>
  );

  const editForm = (
    <form onSubmit={(e) => updateBioDetails (e)} className="edit-bio-form">
      <input name="updateName" type="text" id="" placeholder="Your Name" />
      <input name="updateAbout" type="text" id="" placeholder="About You" />
      <br />
      {cancelButton}
      <button type="submit" className="save-button">
        Save
      </button>
    </form>
  );
  return (
    <section className="bio">
      <input type="file" accept="image/." name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePic}>
        <div
          className="profile-photo"
          role="button"
          title="click to edit photo"
        >
          <img src={getProfilePhoto} alt="profile" />
        </div>
      </label>
      
{bioDetails?.map((details)=> {
 
return(
  <div className="profile-info">
        <p className="name">{details.name}</p>
        <p className="about">{details.about}</p>
      </div>
    )
}  ) }
<div className="profile-info">
{isUpdate ? editForm : editButton}
</div>
    </section>
    
  );
}