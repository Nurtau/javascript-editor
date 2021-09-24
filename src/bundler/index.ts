import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPackagePlugin } from "./plugins";

let isInitialized = false;

export const bundle = async (input: string): Promise<string> => {
  if (!isInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.28/esbuild.wasm",
    });
    isInitialized = true;
  }
  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPackagePlugin(input)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });
  return result.outputFiles[0].text;
};
