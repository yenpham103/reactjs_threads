import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebookSquare } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { client } from "@/utils/client"
import { saveLocalRefreshToken, saveLocalToken } from "@/utils/auth"
import { useToastAlert } from "@/hooks/toast"
import { useDispatch } from "react-redux"
import { updateAuthStatus } from "@/stores/slices/authSlice"

export default function Login() {
  const  toast  = useToastAlert()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch()
  const onSubmit = async (formData: unknown) => {
    const { username: email, password } = formData as { username: string, password: string }

    try {
      const { data } = await client.post("/auth/login", { email, password })
      saveLocalToken(data.access_token)
      saveLocalRefreshToken(data.refresh_token)
      dispatch(updateAuthStatus(true))
      navigate("/")

    } catch {
      toast("Invalid username or password")
    }

  };

  useEffect(() => {
    trigger(["username", "password"], { shouldFocus: true });
    setIsLoading(false)
  }, [])

  console.log(errors);

  return (
    <div>
      <h1 className='text-center text-black font-bold mb-5'>Đăng nhập bằng tài khoản Instagram</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Username, phone or email" className="mb-5 bg-[rgb(245, 245, 245)] py-6" {...register("username", {
          required: {
            value: true,
            message: "Username is required"
          }
        })} />
        <Input type="password" placeholder="Password" className="mb-5 bg-[rgb(245, 245, 245)] py-6" {...register("password", {
          required: {
            value: true,
            message: "Password is required"
          }
        })} />
        <Button size={null} className="w-full py-4 disabled:opacity-100 disabled:text-gray-400" type="submit" disabled={isLoading || !!errors.username || !!errors.password} >Đăng nhập</Button>
      </form>
      <div className="flex justify-center mt-5">
        <Link to="/forgot-password" className="text-[#999]">Forgot password ?</Link>
      </div>
      <div className="flex mt-5 items-center justify-center gap-3 text-[#999]">
        <Separator className="w-7" />
        <span>or</span>
        <Separator className="w-7" />
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <Button variant="outline" className="w-full"><FaFacebookSquare /> Facebook</Button>
        <Button variant="outline" className="w-full"><FaGoogle />Google</Button>
      </div>
      <div className="flex justify-center mt-5 gap-4">
        <span>Have not an account ?</span>
        <Link to="/register" className="text-[#999]">Register</Link>
      </div>
    </div>
  )
}
