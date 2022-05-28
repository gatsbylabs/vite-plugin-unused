import { Plugin } from "vite";
import path from "path";
import fs from "fs";

interface PluginUnusedOptions {
  includeDirs: RegExp[];
  includeExtensions: string[];
  excludeExtensions: string[];
  root: string;
}
export function pluginUnused(opts: PluginUnusedOptions): Plugin {
  const foundFiles: string[] = [];

  return {
    name: "vite-plugin-unused",
    enforce: "post",
    apply: "build",
    load(id) {
      foundFiles.push(id);
      return null;
    },
    async buildEnd() {
      const includedFiles = foundFiles.filter((fileName) => {
        const included = opts.includeDirs.reduce((included, regex) => {
          return included || regex.test(fileName);
        }, false);
        return included;
      });
      const includedFilesSet = new Set(includedFiles);
      const allFiles = (await walkFiles(path.resolve(opts.root))).filter(
        (fileName) =>
          !new RegExp(`.(${opts.excludeExtensions.join("|")})$`).test(
            fileName
          ) &&
          new RegExp(`.(${opts.includeExtensions.join("|")})$`).test(fileName)
      );
      const unusedFiles = allFiles.filter((fileName) => {
        return !includedFilesSet.has(fileName);
      });
      console.log("Unused files:");
      console.log(JSON.stringify(unusedFiles, null, 2));
    },
  };
}

async function walkFiles(root: string) {
  const files = await fs.promises.readdir(root, { withFileTypes: true });

  const results: (string | string[])[] = await Promise.all(
    files.map(async (file) => {
      if (file.isDirectory()) {
        return await walkFiles(path.join(root, file.name));
      }
      return path.join(root, file.name);
    })
  );

  return results.flat();
}
