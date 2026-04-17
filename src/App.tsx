import { AppRoutes } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "rounded-2xl",
        }}
      />
      <AppRoutes />
    </>
  );
}
