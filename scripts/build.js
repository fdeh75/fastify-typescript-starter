import { build } from "esbuild";
import PackageJson from '../package.json' assert { type: "json" };
import { builtinModules } from "module";

let { dependencies, peerDependencies } = PackageJson;

dependencies = !dependencies ? {} : dependencies;
peerDependencies = !peerDependencies ? {}: peerDependencies;

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  // minify: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)).concat(builtinModules),
};

await build({
  ...sharedConfig,
  outdir: "build",
  platform: 'neutral', // for ESM
  format: "esm",
});
