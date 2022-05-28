import { defineConfig } from "vite";
import { pluginUnused } from "../src/index";

export default defineConfig({
  plugins: [pluginUnused({})],
});
