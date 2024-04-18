import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaRegCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import * as client from "./client";
import { Module } from "./client";

function ModuleList() {
  const { courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [module, setModule] = useState<Module>({
    _id: new Date().getTime().toString(),
    id: new Date().getTime().toString(),
    name: "New Module",
    description: "New Description",
    course: courseId ? courseId : "",
    lessons: [{ id: "", name: "", description: "", module: "" }],
  });
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(courseId);
    setModules(modules);
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const handleAddModule = async () => {
    try {
      const newModule = await client.createModule(courseId, module);
      setModules([newModule, ...modules]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      setModules(modules.filter((m) => m._id !== moduleId));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateModule = async () => {
    try {
      const status = await client.updateModule(module);
      setModules(modules.map((m) => (m._id === module._id ? module : m)));
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedModule, setSelectedModule] = useState(modules[0]);
  return (
    <div className="flex-fill">
      <div className="btn-toolbar align-self-end column-gap-1">
        <button type="button" className="btn btn-outline-secondary">
          Collapse All
        </button>
        <button type="button" className="btn btn-outline-secondary">
          View Progress
        </button>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
          >
            <FaRegCheckCircle className="mb-1"></FaRegCheckCircle> Publish All
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="/">
                {" "}
                Publish All
              </a>
            </li>
          </ul>
        </div>
        <button type="button" className="btn btn-danger">
          <FaPlus className="mb-1" /> Module
        </button>
        <button type="button" className="btn btn-outline-secondary">
          <FaEllipsisV />{" "}
        </button>
      </div>

      <hr />

      <li className="list-group-item mb-3 d-flex flex-row justify-content-between">
        <div className="flex-grow-1">
          <input
            className="w-75 mb-1"
            value={module.name}
            onChange={(e) =>
              setModule({
                ...module,
                name: e.target.value,
              })
            }
          />
          <br />
          <textarea
            className="w-75"
            value={module.description}
            onChange={(e) =>
              setModule({
                ...module,
                description: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button className="btn btn-danger me-1" onClick={handleAddModule}>
            Add
          </button>
          <button className="btn btn-primary" onClick={handleUpdateModule}>
            Update
          </button>
        </div>
      </li>

      <ul className="list-group wd-modules">
        {modules
          .filter((module) => module.course === courseId)
          .map((module) => (
            <li
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
              key={module._id}
            >
              <div className="d-flex justify-content-between flex-wrap">
                <span className="my-1">
                  <FaEllipsisV className="me-3" />
                  {module.name}
                </span>

                <span className="mt-1">
                  <button
                    className="wd-module-edit btn btn-outline-primary p-0 pe-1 ps-1 me-2"
                    onClick={() => setModule(module)}
                  >
                    Edit
                  </button>
                  <button
                    className="wd-module-delete btn btn-outline-danger p-0 pe-1 ps-1 me-3"
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-3" />
                  <FaEllipsisV className="ms-3" />
                </span>
              </div>
              {selectedModule?._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any) => (
                    <li className="list-group-item">
                      <FaEllipsisV className="me-3" />
                      {lesson.name}
                      <span className="float-end mt-1">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-3" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ModuleList;