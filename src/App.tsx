import AppRoutes from "./routes/AppRoutes";
import SessionInitializer from "./components/auth/SessionInitializer";

export default function App() {
  return (
    <SessionInitializer>
      <AppRoutes />
    </SessionInitializer>
  );
}