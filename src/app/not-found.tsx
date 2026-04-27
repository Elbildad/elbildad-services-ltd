import Link from "next/link";

const ErrorPage = () => {
  return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <h1>404 - Not Found</h1>
      <Link href="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
