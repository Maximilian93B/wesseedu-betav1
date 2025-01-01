'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { validateEmail, validatePassword, validateName, validatePhone } from '@/lib/utils/formValidation'

type UserType = 'investor' | 'company'

type FormData = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  userType: UserType
}

type FormErrors = {
  [K in keyof FormData]?: string
}

export default function SignUpWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'investor',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const handleUserTypeChange = useCallback((value: UserType) => {
    setFormData(prev => ({ ...prev, userType: value }))
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
      isValid = false
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long'
      isValid = false
    }
    if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name is required'
      isValid = false
    }
    if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name is required'
      isValid = false
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }, [formData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const supabase = createClientComponentClient({
        options: {
          db: {
            schema: 'public'
          }
        }
      })

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: formData.userType,
          }
        }
      })

      if (authError || !authData.user) throw new Error('Failed to create user account')

      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone || null,
          user_type: formData.userType,
          tier_id: 1,
          is_verified: false
        })

      if (profileError) {
        console.error('Profile Creation Error:', profileError)
        throw new Error(`Failed to create user profile: ${profileError.message}`)
      }

      if (formData.userType === 'company') {
        const { error: companyError } = await supabase
          .from('companies')
          .insert({
            user_id: authData.user.id,
            name: '',
            street_address: '',
            city: '',
            state: '',
            country: '',
            postal_code: '',
            industry: '',
            funding_goal: 0,
            is_verified: false
          })

        if (companyError) {
          console.error('Company Creation Error:', companyError)
          await supabase.from('users').delete().match({ id: authData.user.id })
          await supabase.auth.admin.deleteUser(authData.user.id)
          throw new Error(`Failed to create company profile: ${companyError.message}`)
        }
      }

      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
        duration: 6000,
      })

      router.push('/auth/signup-success')

    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 1:
        return validateEmail(formData.email) && validatePassword(formData.password)
      case 2:
        return validateName(formData.firstName) && validateName(formData.lastName)
      case 3:
        return true // User type is always valid
      default:
        return false
    }
  }, [step, formData])

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Sign up to get started with our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit}>
          <Tabs value={step.toString()} onValueChange={(value) => setStep(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Account</TabsTrigger>
              <TabsTrigger value="2">Personal</TabsTrigger>
              <TabsTrigger value="3">User Type</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby="email-error"
                  />
                  {errors.email && <p id="email-error" className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby="password-error"
                  />
                  {errors.password && <p id="password-error" className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    aria-describedby="firstName-error"
                  />
                  {errors.firstName && <p id="firstName-error" className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    aria-describedby="lastName-error"
                  />
                  {errors.lastName && <p id="lastName-error" className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby="phone-error"
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="3">
              <RadioGroup
                value={formData.userType}
                onValueChange={handleUserTypeChange}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor">Investor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Company</Label>
                </div>
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step > 1 ? step - 1 : step)}
          disabled={step === 1}
        >
          Previous
        </Button>
        {step === 3 ? (
          <Button
            type="submit"
            form="signup-form"
            disabled={loading || !canProceed()}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

