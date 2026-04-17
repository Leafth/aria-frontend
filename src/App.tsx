import { Toaster } from "sonner";
import { AppRoutes } from "./routes";

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
