// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080", // Spring Boot 서버 주소
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // WebSocket 프록시 설정 추가
      "/ws": {
        target: "http://localhost:8080", // WebSocket 서버 주소
        ws: true, // WebSocket 요청을 프록시
        changeOrigin: true,
      },
    },
  },
});
