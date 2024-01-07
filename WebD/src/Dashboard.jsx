import React from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = React.useState([]);
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get("https://api.example.com/projects");
      setProjects(response.data);
    };

    const fetchMembers = async () => {
      const response = await axios.get("https://api.example.com/members");
      setMembers(response.data);
    };

    fetchProjects();
    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 shadow rounded p-4">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="mb-2">
                  {project.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 shadow rounded p-4">
            <h2 className="text-xl font-bold mb-4">Members</h2>
            <ul>
              {members.map((member) => (
                <li key={member.id} className="mb-2">
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
