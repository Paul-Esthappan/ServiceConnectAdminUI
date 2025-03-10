import { useState } from "react";
import { editProfile } from "../../../service/api/admin/PutApi";

const EditProfileForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: user.name ? user.name.split(" ")[0] : "", // Safe check
    lastName: user.name ? user.name.split(" ")[1] : "", // Safe check
    email: user.email || "",
    phone: user.mobile_number || "",
    password: "",
    nationality: user.country,
    designation: user.designation || "",
    countryCode: "+1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const profileData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.countryCode + formData.phone,
      country: formData.nationality,
      designation: formData.designation,
    };
    console.log("profiledata", profileData);

    try {
      const response = await editProfile(profileData); // Call API
      console.log("Profile updated successfully", response);
      if (onSubmit) onSubmit(profileData); // Notify parent component if needed
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-full mx-auto"
    >
      <h1 className="font-nunito text-2xl sm:text-3xl leading-8 text-left">
        Edit Profile
      </h1>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            onChange={handleInputChange}
            value={formData.firstName}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            type="text"
            onChange={handleInputChange}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative flex">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            className="w-[65px] h-14 p-2 mr-2 px-4 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+81">+81</option>
            <option value="+86">+86</option>
          </select>

          <div className="relative flex-grow">
            <label className="absolute left-2 top-2 text-gray-500 transition-all duration-200">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="peer w-full h-14 p-2 px-2 pt-6 pb-1 rounded-r-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            autoComplete="current-password"
          />
        </div>

        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            Nationality
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          <label className="absolute left-4 top-2 text-gray-500 transition-all duration-200">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="peer w-full h-14 p-2 px-4 pt-6 pb-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 appearance-none pr-10" // Add appearance-none and pr-10 for padding-right
          >
            <option value="Intern UI">Intern UI</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Project Management">Project Management</option>
          </select>

          {/* arrow icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          type="submit"
          className="mt-4 w-full sm:w-[195px] h-14 bg-[#5570F1] rounded-lg text-white py-2 px-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
