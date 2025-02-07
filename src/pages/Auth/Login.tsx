import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebookSquare } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { saveLocalRefreshToken, saveLocalToken } from "@/utils/auth"
import { useToastAlert } from "@/hooks/toast"
import { MESSAGES } from "@/constants/message"
import { requestLogin } from "@/services/authService"
import { RouteNames } from "@/constants/route"
const TIMEOUT = 1000

export default function Login() {
  const toast = useToastAlert()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (formData: unknown) => {
    const { username: email, password } = formData as { username: string, password: string }

    try {
      setIsLoading(true)
      const data = await requestLogin({ email, password })
      saveLocalToken(data.access_token)
      saveLocalRefreshToken(data.refresh_token)
      setTimeout(() => {
        navigate("/")
      }, TIMEOUT)
      toast(MESSAGES.auth.authenticated)

    } catch {
      toast(MESSAGES.auth.unauthenticated)
    } finally {
      setIsLoading(false)
    }

  };

  useEffect(() => {
    trigger(["username", "password"], { shouldFocus: true });
    setIsLoading(false)
  }, [])


  return (
    <div>
      <h1 className='text-center text-black font-bold mb-5'>Đăng nhập bằng tài khoản Instagram</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Username, phone or email" className="mb-5 bg-[rgb(245, 245, 245)] py-6" {...register("username", {
          required: {
            value: true,
            message: MESSAGES.auth.username
          }
        })} />
        <Input type="password" placeholder="Password" className="mb-5 bg-[rgb(245, 245, 245)] py-6" {...register("password", {
          required: {
            value: true,
            message: MESSAGES.auth.password
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
        <Link to={RouteNames.AUTH_REGISTER} className="text-[#999]">Register</Link>
      </div>
    </div>
  )
}
