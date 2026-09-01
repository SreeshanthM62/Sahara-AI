import React from "react";
import { aiTools } from "../assets/assets";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";

const AiTools = () => {

    const {user} = useUser()
    const navigate = useNavigate()
  return (
    <section className="px-5 py-24 sm:px-10 lg:px-24">
      {/* Heading */}

      <div className="max-w-3xl mx-auto text-center">
        <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-600">
          AI FEATURES
        </span>

        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
          Explore Our AI Toolkit
        </h2>

        <p className="mt-5 text-gray-500 text-lg">
          Powerful AI tools designed to help you write, edit, generate,
          and automate your workflow.
        </p>
      </div>

      {/* Cards */}

      <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {aiTools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.id}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${tool.gradient}`}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                {tool.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-500">
                {tool.description}
              </p>

              <button onClick = {() => user && navigate(tool.path)}className="mt-8 text-violet-600 font-semibold group-hover:translate-x-1 transition cursor-pointer">
                Try Now →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AiTools;