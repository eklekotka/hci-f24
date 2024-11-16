class User {
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string;
  
    constructor(firstName: string = "", lastName: string = "", email: string = "", profilePic: string = "") {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.profilePic = profilePic;
    }
  
    // Save the user data to localStorage
    saveToLocalStorage() {
      localStorage.setItem("userInfo", JSON.stringify(this));
    }
  
    // Load the user data from localStorage
    static loadFromLocalStorage(): User {
      const storedData = localStorage.getItem("userInfo");
      if (storedData) {
        const { firstName, lastName, email, profilePic } = JSON.parse(storedData);
        return new User(firstName, lastName, email, profilePic);
      }
      return new User(); // Return an empty user if no data is found
    }
  }
  
  export default User;
  