import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartNewProject() {
    setProjectsState((prevProjects) => ({ ...prevProjects, selectedProjectId: null })); //null means new project was clicked. undefined means nothing and noproject component should be shown
  }

  function handleSaveProject(projectData) {
    const newProject = { ...projectData, id: Math.random(), tasks: [] };
    setProjectsState((prevProjects) => ({ ...prevProjects, selectedProjectId: undefined, projects: [...prevProjects.projects, newProject] })); //null means new project was clicked. undefined means nothing and noproject component should be shown
  }

  function handleCancelNewProject() {
    setProjectsState((prevProjects) => ({ ...prevProjects, selectedProjectId: undefined })); //null means new project was clicked. undefined means nothing and noproject component should be shown
  }

  function handleSelectProject(projectId) {
    setProjectsState((prevProjects) => ({ ...prevProjects, selectedProjectId: projectId }));
  }

  function handleDeleteProject(projectId) {
    setProjectsState((prevProjects) => ({ ...prevProjects, selectedProjectId: undefined, projects: prevProjects.projects.filter((project) => project.id !== projectId) }));
  }

  function handleNewTask(taskData, projectId) {
    const newTask = { id: Math.random(), task: taskData };
    setProjectsState((prevProjects) => {
      const updatedProjects = prevProjects.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: [...project.tasks, newTask] };
        }
        return project;
      });
      return { ...prevProjects, projects: updatedProjects };
    });
  }

  function handleDeleteTask(taskId, projectId) {
    setProjectsState((prevProjects) => {
      const updatedProjects = prevProjects.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: project.tasks.filter((task) => task.id !== taskId) };
        }
        return project;
      });
      return { ...prevProjects, projects: updatedProjects };
    });
  }

  let content = <NoProjectSelected onAddNewProject={handleStartNewProject} />;
  if (projectsState.selectedProjectId) {
    const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId);
    content = <ProjectDetails project={selectedProject} onDeleteProject={handleDeleteProject} onAddTask={handleNewTask} onDeleteTask={handleDeleteTask} />;
  }
  else if (projectsState.selectedProjectId === null) {
    content = <NewProject onSaveProject={handleSaveProject} onCanelNewProject={handleCancelNewProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId} onAddNewProject={handleStartNewProject} onProjectSelect={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
