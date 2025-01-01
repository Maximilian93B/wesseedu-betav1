'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-center">
          Please check your email to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <p className="font-medium">Next steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>Once verified, you can continue to your dashboard</li>
          </ol>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Haven't received the email?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your spam folder</li>
            <li>Make sure the email address is correct</li>
            <li>Allow a few minutes for delivery</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


