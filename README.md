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
  // root folder to look for files, this branches off the root found from your vite config
  // defaults to "src/"
  root?: string;
  // glob pattern of file extensions
  // defaults to  `["*.ts", "*.js", "*.jsx", "*.tsx"]`
  ext?: string[];
  // glob pattern of files to exclude, this uses the root configured in this plugins options.
  exclude?: string[];
}
```

---

Created and maintained by [Enoch Chau](https://enochchau.com) and the engineers at [Gatsby Labs](https://gatsby.events).
