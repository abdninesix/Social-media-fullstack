'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <div className='h-screen flex items-center justify-between p-8'>
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <Image src='/favicon.svg' alt='logo' width={500} height={500} />
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8">
        <h1 className='text-2xl xsm:4xl md:text-6xl font-bold'>Let's go!</h1>

        <SignIn.Root>

          <Clerk.Connection name='google' className='bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-6'>
            <Image src='/google.svg' alt='Google' width={20} height={20} />
            Sign in with Google
          </Clerk.Connection>

          <div className='flex items-center gap-4 w-72'>
            <div className="h-px bg-textGrayLight flex-grow"></div>
            <span className='text-textGrayLight'>or</span>
            <div className="h-px bg-textGrayLight flex-grow"></div>
          </div>

          {/* Email entry */}
          <SignIn.Step name="start" className='flex flex-col gap-8'>
            <Clerk.Field name="identifier" className='flex flex-col gap-2'>
              <Clerk.Input placeholder='Email' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
              <Clerk.FieldError className='text-red-300 text-sm' />
            </Clerk.Field>
            <SignIn.Action submit className='bg-iconBlue rounded-full p-2 hover:bg-iconBlue/80 text-white w-72 flex items-center justify-center'>Continue</SignIn.Action>
          </SignIn.Step>

          {/* Password entry */}
          <SignIn.Step name="verifications" className='flex flex-col justify-between text-sm text-iconBlue'>
            <SignIn.Strategy name="password">
              <Clerk.Field name="password" className='flex flex-col gap-2'>
                <Clerk.Input placeholder='Password' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>
              <div className='flex justify-between mt-2 text-sm w-72 text-iconBlue'>
                <SignIn.Action submit className='hover:underline' >Continue</SignIn.Action>
                <SignIn.Action navigate='forgot-password' className='hover:underline'>Forgot password?</SignIn.Action>
              </div>
            </SignIn.Strategy>

            {/* Email code entry */}
            <SignIn.Strategy name="reset_password_email_code">
              <p className='text-sm mb-8'>We sent a code to <SignIn.SafeIdentifier /></p>
              <Clerk.Field name="code" className='flex flex-col gap-2 text-iconBlue text-sm'>
                <Clerk.Input placeholder='Enter the code' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>
              <SignIn.Action submit className='mt-2 text-sm hover:underline w-72 text-center text-iconBlue'>Continue</SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>

          {/* Forgot password */}
          <SignIn.Step name="forgot-password" className='flex justify-between text-sm w-72 text-iconBlue'>
            <SignIn.SupportedStrategy name="reset_password_email_code">
              <span className='hover:underline'>Reset password</span>
            </SignIn.SupportedStrategy>
            <SignIn.Action navigate="previous" className='hover:underline'>Go back</SignIn.Action>
          </SignIn.Step>

          {/* Reset password */}
          <SignIn.Step name="reset-password" className='flex justify-between text-sm w-72 text-iconBlue'>
            <h1>Reset your password</h1>
            <Clerk.Field name="password">
              <Clerk.Label>New password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="confirmPassword">
              <Clerk.Label>Confirm password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit>Reset password</SignIn.Action>
          </SignIn.Step>

          <div className='flex items-center gap-4 w-72'>
            <div className="h-px bg-textGrayLight flex-grow"></div>
            <span className='text-textGrayLight'>or</span>
            <div className="h-px bg-textGrayLight flex-grow"></div>
          </div>
          
          <Link href='/sign-up' className='bg-iconBlue rounded-full p-2 hover:bg-iconBlue/80 text-white w-72 flex items-center justify-center'>Create new account</Link>
          <p className='w-72 text-xs'>By signing up, you agree to the Terms of Privacy Policy, including Cookie Use.</p>

        </SignIn.Root>
      </div>
    </div>
  )
}

export default SignInPage