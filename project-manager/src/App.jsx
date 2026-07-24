import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

/* --------------------------------------------------------
App - Base point of the Project management application
  - project state - 
    1. ID > unique identifier for each project being tracked
      undefined > landing page
      null > new project definition
      project ID > open the selected project 
    2. projects > List of all projects. Each project will have 
      a. Title of the project
      b. Decription of the project
      c. Due date by when the project was to be completed
    3. tasks > All tasks associated to each prject. Each task
      will have
      a. Task ID
      b. Associated project ID
      c. task details
    4. selectedProject > 

    - handleStartProject > Open the new project page
    - handleAddProject > Add a new project
    - handleCancelStartProject > Cancel the new project and 
        return to old screen
    - handleSelectProject > Open a selected project
    - handleDeleteProject > Delete the selected project
    - handleAddTask > Add a task to the selected project
    - handleDeleteTask > Delete the highlighted task
-------------------------------------------------------- */

function App() {
  const [projectState, setProjectState] = useState({
    projectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartProject = () => {
    setProjectState((prev) => {
      return { ...prev, projectId: null };
    });
  };

  const handleAddProject = (project) =>
    setProjectState((prev) => {
      const projectId = Math.random();
      const newProject = {
        ...project,
        id: projectId,
      };
      return {
        ...prev,
        projectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });

  const handleCancelStartProject = () =>
    setProjectState((prev) => {
      return { ...prev, projectId: undefined };
    });

  const handleSelectProject = (id) =>
    setProjectState((prev) => {
      return { ...prev, projectId: id };
    });

  const handleDeleteProject = () =>
    setProjectState((prev) => {
      return {
        ...prev,
        projectId: undefined,
        projects: prev.projects.filter(
          (project) => project.id !== prev.projectId,
        ),
      };
    });

  const handleAddTask = (text) =>
    setProjectState((prev) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prev.projectId,
        text: text,
      };

      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      };
    });

  const handleDeleteTask = (id) =>
    setProjectState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      };
    });

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.projectId,
  );
  let content = (
    <SelectedProject
      tasks={projectState.tasks}
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectState.projectId === null)
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelStartProject}
      />
    );
  else if (projectState.projectId === undefined)
    content = <NoProjectSelected onStartProject={handleStartProject} />;

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartProject={handleStartProject}
        projects={projectState.projects}
        onSelect={handleSelectProject}
        selectedProjectId={projectState.projectId}
      />
      {content}
    </main>
  );
}

export default App;
