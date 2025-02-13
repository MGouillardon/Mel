import { useForm, Link } from "@inertiajs/react";

function Login() {

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember_me: false,
  });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/login");
  }

  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="w-full max-w-96 flex flex-col gap-2 px-3 py-6 md:p-6 bg-base-content/20 rounded-md">
        <h1>Login</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email"/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path 
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" checked={data.remember_me} onChange={(e) => setData('remember_me', e.target.checked)} className="checkbox" />
          </label>
          <button className="btn btn-neutral" type="submit" disabled={processing}>Login</button>

          {/* { errors ?? <div className="text-red-500">{errors}</div> } */}
        </form>
      <div className="pt-2 flex flex-col gap-2">
        <p className="text-sm">Don't have an account yet?</p>
        <Link className="btn btn-secondary w-full" href="/register">Create one now</Link>
      </div>
      </div>
    </div>
  );
}

export default Login;