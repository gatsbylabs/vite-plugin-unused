import { Plugin } from "vite";
import path from "path";
import fg from "fast-glob";

export interface Options {
  exclude?: string[];
  ext?: string[];
  root?: string;
}

/**
 * @param args.exclude - glob pattern of files to exclude
 * @param args.ext - file extensions, defaults to: `["*.ts", "*.js", "*.jsx", "*.tsx"]`
 * @param args.root - root of the project, defaults to `"src/"`
 * @returns plugin
 */
export function pluginUnused(opts: Options): Plugin {
  const usedFiles: string[] = [];
  const {
    root = "src/",
    ext = ["*.ts", "*.js", "*.jsx", "*.tsx"],
    exclude = [],
  } = opts;

  return {
    name: "@gatsbylabs/vite-plugin-unused",
    enforce: "post",
    apply: "build",
    load(id) {
      usedFiles.push(id);
      return null;
    },
    async buildEnd() {
      const extensionGlobs = ext.map((ext) => path.join(root, "**", ext));

      const fgOpts = { dot: true };
      const [allFiles, excludedFiles] = await Promise.all([
        globResolve(extensionGlobs, fgOpts),
        globResolve(exclude, fgOpts),
      ]);

      const foundFiles = filterExcluded(allFiles, excludedFiles);
      const unusedFiles = filterExcluded(foundFiles, usedFiles);

      console.log("Unused files:");
      unusedFiles.forEach((fileName) => {
        console.log("-", fileName);
      });
    },
  };
}

export async function globResolve(
  patterns: string | string[],
  opts: fg.Options
) {
  const result = await fg(patterns, opts);
  return result.map((fileName) => path.resolve(__dirname, fileName));
}

export function filterExcluded<T>(all: T[], exclude: T[]) {
  const s = new Set(exclude);
  return all.filter((a) => !s.has(a));
}