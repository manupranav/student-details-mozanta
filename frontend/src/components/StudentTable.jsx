import React from "react";

const StudentTable = ({ students }) => {
  // Sort the students array by name in ascending order
  const sortedStudents = [...students].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : 1;
  });
  return (
    <div className="ml-20 shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th className="px-6 py-3">Date of Birth</th>
            <th className="px-6 py-3">Class</th>
            <th className="px-6 py-3">Division</th>
            <th className="px-6 py-3">Gender</th>
          </tr>
        </thead>
        {
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {student.name}
                </th>
                <td className="px-6 py-4">{student.dob}</td>
                <td className="px-6 py-4">{student.standard}</td>
                <td className="px-6 py-4">{student.division}</td>
                <td className="px-6 py-4">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  );
};

export default StudentTable;
