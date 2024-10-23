//import defaultProfilePic from "../../photos/default-profile-pic.png"; // Placeholder image path default-profile-pic.jpg


const ProfilePage = () => {



  return (
    <div className="page-container">
 
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div className="profile-picture">
            <img
        
              alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              id="upload"
              style={{ display: "none" }}
            />
            <label className="change-icon-button" htmlFor="upload">
              Change Icon
            </label>
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> Keith Bagley</p>
            <p><strong>Username:</strong> Bagleydaman</p>
            <p><strong>Year:</strong> Professor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
