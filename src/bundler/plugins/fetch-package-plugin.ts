import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const packages = localforage.createInstance({
  name: "packages",
});

export const fetchPackagePlugin = (code: string) => {
  return {
    name: "fetch-package-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: "jsx",
          contents: code,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        let packageData = await packages.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (packageData) return packageData;
      });

      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        const { data, request } = await axios.get<string>(args.path);
        const escapedData = data
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
          .replace(/\n/g, "");
        const contents = `
					const style = document.createElement("style");
					style.innerText = '${escapedData}';
					document.head.appendChild(style);
				`;

        const packageData: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: request.responseURL,
        };
        packages.setItem(args.path, packageData);
        return packageData;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get<string>(args.path);
        const packageData: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: request.responseURL,
        };
        packages.setItem(args.path, packageData);
        return packageData;
      });
    },
  };
};
