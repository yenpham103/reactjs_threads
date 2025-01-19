import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { FaFacebookSquare } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"

export default function Login() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Account created.",
      variant: "destructive",
      className: "fixed bottom-5 z-50 max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px] bg-black text-white rounded-md border-black",
    })
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
