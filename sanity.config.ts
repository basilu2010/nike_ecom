import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { structureTool } from "sanity/structure";
import { NewspaperIcon } from "@heroicons/react/20/solid";
import { schemaTypes } from "./nike-ecom/schemas";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
	name: "Nike",
	title: "Ecommerce",
	basePath: "/studio",

	projectId: "uly7ufnv",
	dataset: "production",

	plugins: [deskTool()],

	schema: {
		types: schemaTypes,
	},
});
export default config;
