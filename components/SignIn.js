import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const postData = {
      email: data.email,
      password: data.password,
    };

    const post = await fetch("/api/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(postData),
    }).then((res) => {
      if (res.status === 401) {
        toast.error("Invalid credentials. Please check the email and password.", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };

  return (
    <form className="loginFields" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="loginTitle">Sign In</h3>

      <motion.div animate={{ x: errors.userName && [0, 20, -20, 20, -20, 0] }} transition={{ duration: 0.5 }}>
        <input type="email" placeholder="Email" className={`loginFormInput ${errors.email && "loginInputError"}`} {...register("email", { required: true })} />
      </motion.div>

      <motion.div animate={{ x: errors.password && [0, 20, -20, 20, -20, 0] }} transition={{ duration: 0.5 }}>
        <input type="password" placeholder="Password" className={`loginFormInput ${errors.password && "loginInputError"}`} {...register("password", { required: true, minLength: 8 })} />
      </motion.div>

      <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group w-fit mx-auto" type="submit">
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#5a16c6] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Login</span>
      </button>
    </form>
  );
}

export default SignIn;
