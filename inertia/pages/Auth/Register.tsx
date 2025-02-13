import { Roles } from "#enum/Role";
import { useForm, Link } from "@inertiajs/react";

function Register() {
  
  const { data, setData, post, processing, errors } = useForm({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    password_confirmation:'',
    role: Roles.CLIENT
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/register");
  }


  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="w-full max-w-96 flex flex-col gap-2 px-3 py-6 md:p-6 bg-base-content/20 rounded-md">
        <h1>Register</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Firstname" value={data.firstName} onChange={(e) => setData('firstName', e.target.value)}/>
          </label>
          { errors.firstName && <div className="text-red-500">{errors.firstName}</div> }
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Lastname" value={data.lastName} onChange={(e) => setData('lastName', e.target.value)}/>
          </label>
          { errors.lastName && <div className="text-red-500">{errors.lastName}</div> }
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
          { errors.email && <div className="text-red-500">{errors.email}</div> }
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
          {errors.password && <div className="text-red-500">{errors.password}</div>}
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
            <input type="password" className="grow" name="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
          </label>
          {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
          <span className="text-xs">
            <h3>Your password must meet the following requirements:</h3>
            <ul className="list-disc list-inside">
              <li>Contains at least 8 characters.</li>
              <li>Includes at least one uppercase letter.</li>
              <li>Includes at least one lowercase letter.</li>
              <li>Contains at least one number.</li>
              <li>Contains at least one special character (e.g., !@#$%^&*).</li>
            </ul>
          </span>
          <button className="btn btn-neutral" type="submit" disabled={processing}>Register</button>

        </form>
        <div className="pt-2 flex flex-col gap-2">
          <p className="text-sm">Already have an account?</p>
          <Link className="btn btn-secondary w-full" href="/login">Log in here</Link>
      </div>
      </div>
    </div>
  );
}

export default Register;