# Vite Plugin Unused

Detect unused files files in a Vite project.

Example `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { pluginUnused } from "@gatsbylabs/vite-plugin-unused";

export default defineConfig({
  plugins: [pluginUnused({})],
});
```

An example vite project can be found in the `examples/` directory.

## Usage

```ts
interface Options {
  // glob pattern of files to exclude
  exclude?: string[];
  // glob pattern of file extensions``
  // defaults to  `["*.ts", "*.js", "*.jsx", "*.tsx"]`
  ext?: string[];
  // root folder to look for files, this branches off the root found from your vite config
  // defaults to "src/"
  root?: string;
}
```
