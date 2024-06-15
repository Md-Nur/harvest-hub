import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.info(error);

  return (
    <div
      id="error-page"
      className="w-full h-screen flex items-center justify-center flex-col p-5"
    >
      {error.status === 404 ? (
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png"
            alt="404"
            className="w-96 h-96"
          />
          <h1 className="text-9xl font-bold text-center">404</h1>
          <h2 className="text-2xl font-bold text-center">Page Not Found</h2>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-9xl font-bold text-center">{error.status}</h1>
          <h2 className="text-2xl font-bold text-center">
            {error.message || "Something went wrong"}
          </h2>
        </div>
      )}
    </div>
  );
}
