import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import Preview from "./components/Preview";
import './assets/styles/global.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/preview', element: <Preview /> }
    ],
    errorElement: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
