
import React, { useState } from "react";

const EditProfile = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    password: "",
    nationality: user.country,
    designation: user.designation,
    countryCode: "+91",
    address: user.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.countryCode + formData.phone,
      nationality: formData.nationality,
      designation: formData.designation,
      address: formData.address,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 max-w-full mx-auto">
      <h1 className="font-nunito text-2xl sm:text-3xl leading-8 text-left">Edit Profile</h1>
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" />
        <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
        <InputField label="password" name="change password" value={formData.password} onChange={handleInputChange} />
        <div className="flex gap-1 items-center">
          <select name="countryCode" value={formData.countryCode} onChange={handleInputChange} className="w-18 h-14 border rounded-lg m-2  ">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
          
        </div>
        <SelectField label="Nationality" name="nationality" value={formData.nationality} options={["India", "USA"]} onChange={handleInputChange} />
        <SelectField label="Designation" name="designation" value={formData.designation} options={["Frontend Developer", "Backend Developer"]} onChange={handleInputChange} />
      </div>
      <div className="flex justify-center pt-8">
        <button type="submit" className="w-32 bg-blue-500 text-white mt-4 py-2 rounded-lg">Save</button>
      </div>
    </form>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="relative w-full md:w-[308px] p-2">
    <label className="absolute left-4 top-2 text-gray-500 ">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-[58px] py-2 px-3 rounded-lg border border-gray-300  text-sm text-[#ABAFB1]"

    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="relative w-full md:w-[308px] p-2">
    <label className="absolute left-4 top-2 text-gray-500">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
     
      className="w-full h-[58px] px-4  py-5 rounded-lg border border-gray-300  text-sm text-[#ABAFB1] "
   
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditProfile;