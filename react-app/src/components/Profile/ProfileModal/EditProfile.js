import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { editUserDetail, getUser } from "../../../store/user";
import EditProfileDetails from "./EditProfileDetails";
import DeleteProfile from "./DeleteProfile";

const EditProfile = ({ setShowModal, currentUser }) => {
    const [page, setPage] = useState(0);

      const PageDisplay = () => {
        if (page === 0) {
          return (
            <EditProfileDetails
              setShowModal={setShowModal}
              currentUser={currentUser}
              setPage={setPage}
            />
          );
        } else if (page === 1) {
          return (
            <DeleteProfile
              setShowModal={setShowModal}
              currentUser={currentUser}
              setPage={setPage}
            />
          );
        } 
      };

      return (
        <>
        {PageDisplay()}
        </>
      )

};

export default EditProfile;
