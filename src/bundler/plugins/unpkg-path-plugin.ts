import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /^index\.js$/ }, () => {
        return {
          path: "index.js",
          namespace: "main",
        };
      });

      build.onResolve({ filter: /^\.+/ }, async (args: any) => {
        return {
          namespace: "main",
          path: new URL(args.path, args.resolveDir.slice(1)).href,
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: new URL(args.path, "https://unpkg.com/").href,
          namespace: "main",
        };
      });
    },
  };
};
