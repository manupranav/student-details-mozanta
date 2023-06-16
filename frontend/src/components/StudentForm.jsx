import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentTable from "./StudentTable";

const studentClasses = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];
const studentDivisions = ["A", "B", "C"];
const initialValues = {
  name: "",
  dob: "",
  standard: "",
  division: "",
  gender: "",
};
const StudentForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [students, setStudents] = useState([]);

  // dynamically gets the value from input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); //set values of form to null after submitting

    //  send student details to he backend
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/students",
          formValues
        );
        const createdStudent = response.data;
        setStudents([...students, createdStudent]);
        setFormValues(initialValues);
      } catch (error) {
        console.error("Error creating student:", error);
      }
    }
  };

  // validate the user inputs
  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Za-z\s]+$/;
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!regex.test(values.name)) {
      errors.name = "Name should only contain characters and space!"; // only allows characters and space in name
    }

    if (!values.dob) {
      errors.dob = "Date of Birth is required!";
    }

    if (!values.standard) {
      errors.standard = "Class is required!";
    }

    if (!values.division) {
      errors.division = "Division is required!";
    }

    if (!values.gender) {
      errors.gender = "Gender is required!";
    }

    return errors;
  };

  // fetch the student details from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []); // Added an empty dependency array

  return (
    <>
      <h1 className="my-6 text-4xl font-extrabold block mu">STUDENT DETAILS</h1>
      <div className="flex justify-center">
        <div>
          <form
            className="border shadow-md sm:rounded-lg p-6 w-96"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 mb-6">
              <div>
                <label
                  className="text-left block mb-2 text-sm font-medium text-gray-900 mr-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              </div>

              <div>
                <label
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formValues.dob}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  max={new Date().toISOString().split("T")[0]} // disable selecting future dates
                  required
                />
                {formErrors.dob && (
                  <p className="text-red-500 text-sm">{formErrors.dob}</p>
                )}
              </div>

              <div>
                <label
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="class"
                >
                  Class
                </label>
                <select
                  id="standard"
                  name="standard"
                  value={formValues.standard}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                >
                  <option value="">Select Class</option>
                  {studentClasses.map((studentClass) => (
                    <option value={studentClass} key={studentClass}>
                      {studentClass}
                    </option>
                  ))}
                </select>
                {formErrors.class && (
                  <p className="text-red-500 text-sm">{formErrors.class}</p>
                )}
              </div>

              <div>
                <label
                  className="text-left block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="division"
                >
                  Division
                </label>
                <select
                  id="division"
                  name="division"
                  value={formValues.division}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                >
                  <option value="">Select Division</option>
                  {studentDivisions.map((division) => (
                    <option value={division} key={division}>
                      {division}
                    </option>
                  ))}
                </select>
                {formErrors.division && (
                  <p className="text-red-500 text-sm">{formErrors.division}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="text-left block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </span>
                <div className="flex">
                  <label htmlFor="male" className="flex items-center mr-4">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formValues.gender === "Male"}
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="flex items-center">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formValues.gender === "Female"}
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    Female
                  </label>
                </div>
                {formErrors.gender && (
                  <p className="text-red-500 text-sm">{formErrors.gender}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2"
            >
              Submit
            </button>
          </form>
        </div>
        <StudentTable students={students} />
      </div>
    </>
  );
};

export default StudentForm;
