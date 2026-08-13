import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./studio/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Mayu's Library",

  projectId: "s9ea65o9",
  dataset: "production",

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});