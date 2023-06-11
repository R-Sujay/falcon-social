import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) return;
    console.log(data);
  };

  return (
    <form className="loginFields" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="loginTitle">Sign Up</h3>
      <input type="text" placeholder="Username" className="loginFormInput" {...register("userName", { required: true })} />
      <input type="email" placeholder="Email Address" className="loginFormInput" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" className="loginFormInput" {...register("password", { required: true })} />
      <input type="password" placeholder="Confirm Password" className="loginFormInput" {...register("confirmPassword", { required: true })} />

      <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group w-fit mx-auto" type="submit">
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Register</span>
      </button>
    </form>
  );
}

export default SignUp;
