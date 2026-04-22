"use client";

import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Mail, Lock, User2, Building2, Phone } from "lucide-react";
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';


type Mode = "register" | "login"
type message = {
  type: "message" | "error";
  text: string
}

const LoginClient = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<message | null>(null);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const router = useRouter();
  const { setUser } = useAuth();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get('redirect');
    if (redirectParam) {
      setRedirectUrl(redirectParam);
    }

  }, [])


  const handleSubmit = async () => {
    setMessage({
      type: "error",
      text: ""
    });
    setLoading(true);
    if (mode == "register") {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          data: {
            full_name: fullName,
            company_name: company,
            phone: phone || undefined,
          },
        },
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message
        })
      } else {

        setMessage({
          type: "message",
          text: "Please check your inbox to confirm the new account, if not there please also check the spam folder."
        });
      }

    } else {
      const { error, data } = await supabase.auth.signInWithPassword({
        email, password
      })

      if (error) {
        setMessage({
          type: "error",
          text: error.message
        })
      } else {
        setMessage({
          type: "message",
          text: "Signed in successfully! Redirecting to dashboard..."
        })
        setUser(data.session.user)
        router.push(redirectUrl ? window.location.origin + redirectUrl : '/dashboard');
      }

    }

    setLoading(false);
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
      }
    });
    if (error) {
      setMessage({
        type: "error",
        text: error.message
      })
    } else {
      setMessage({
        type: "message",
        text: "Redirecting to Google for authentication..."
      })
    }
  }

  return (
    <div className="w-full min-h-screen relative pt-10 px-10 pb-10 bg-white/50 backdrop-blur-md bg-cover bg-center">
        <Card className="w-full max-w-xl mx-auto border-0 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-center text-foreground">
              {mode === "login" ? "Please Sign In" : "Get Started"}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {mode === "login"
                ? "Sign in to continue publishing amazing content"
                : "Create your account and start publishing"}
            </CardDescription>
          </CardHeader>
          <Button className='bg-foreground text-white w-fit self-center hover:bg-black/80' onClick={handleLoginWithGoogle} > <Image src="/google-logo.svg" alt="Login With Google" width={20} height={20} className="mr-2 inline-block" />Continue with Google</Button>
          <CardContent className="space-y-4">
            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User2 className="absolute left-3 top-3 h-5 w-5" />
                    <Input
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5" />
                    <Input
                      placeholder="Your Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5" />
                    <Input
                      placeholder="(123) 456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button className="text-sm text-[#1676bf] hover:text-[#0d5a99] font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              className="w-full h-12 bg-linear-to-r from-[#1676bf] to-[#d34586] hover:from-[#0d5a99] hover:to-[#b03670] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </Button>

            <Button
              variant="link"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? " New to Zeest Media?" : " Already have an account?"}{mode === "login" ? " " + "Create New Account" : " " + "Sign In Instead"}
            </Button>

          </CardContent>
        </Card>

      </div>
  );
}

export default LoginClient;