import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const basePath = mode === "production" ? env.VITE_BASE_PATH || "/" : "/"

  return {
    base: basePath,
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
        },
      },
    },
  }
})
