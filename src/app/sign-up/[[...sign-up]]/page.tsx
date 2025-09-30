'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Image from 'next/image'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div className='h-screen flex items-center justify-between p-8'>
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <Image src='/favicon.svg' alt='logo' width={500} height={500} />
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8">

        <h1 className='text-2xl xsm:4xl md:text-6xl font-bold'>Let&apos;s go!</h1>
        <SignUp.Root>

          <SignUp.Step name="start" className='flex flex-col gap-8'>
            <Clerk.Connection name='google' className='bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-6'>
              <Image src='/google.svg' alt='Google' width={20} height={20} />
              Sign up with Google
            </Clerk.Connection>

            <div className='flex items-center gap-4 w-72'>
              <div className="h-px bg-textGrayLight flex-grow"></div>
              <span className='text-textGrayLight'>or</span>
              <div className="h-px bg-textGrayLight flex-grow"></div>
            </div>

            {/* Sign up with email */}
            <div className='flex flex-col gap-4'>
              <Clerk.Field name="username">
                <Clerk.Input placeholder='Username' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>

              <Clerk.Field name="emailAddress">
                <Clerk.Input placeholder='Email' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>

              <Clerk.Field name="password">
                <Clerk.Input placeholder='Password' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>

              <SignUp.Captcha />

              <SignUp.Action submit className='bg-iconBlue rounded-full p-2 hover:bg-iconBlue/80 text-white w-72 flex items-center justify-center'>Sign up</SignUp.Action>
            </div>
          </SignUp.Step>

          <SignUp.Step name="continue" className='flex flex-col gap-8'>
            <Clerk.Field name="username">
              <Clerk.Input placeholder='Username' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
              <Clerk.FieldError className='text-red-300 text-sm' />
            </Clerk.Field>

            <SignUp.Action submit className='bg-iconBlue rounded-full p-2 hover:bg-iconBlue/80 text-white w-72 flex items-center justify-center'>Continue</SignUp.Action>
          </SignUp.Step>

          <SignUp.Step name="verifications" className='flex flex-col justify-between text-sm text-iconBlue'>
            {/* Email code entry */}
            <SignUp.Strategy name="email_code">
              <p className='text-sm mb-8'>Please check your email for verification code</p>
              <Clerk.Field name="code" className='flex flex-col gap-2 text-iconBlue text-sm'>
                <Clerk.Input placeholder='Verification code' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                <Clerk.FieldError className='text-red-300 text-sm' />
              </Clerk.Field>
              <SignUp.Action submit className='mt-8 text-sm hover:underline w-72 text-center text-iconBlue'>Verify</SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>

          <div className='flex items-center gap-4 w-72'>
            <div className="h-px bg-textGrayLight flex-grow"></div>
            <span className='text-textGrayLight'>or</span>
            <div className="h-px bg-textGrayLight flex-grow"></div>
          </div>
          <Link href='/sign-in' className='bg-iconBlue rounded-full p-2 hover:bg-iconBlue/80 text-white w-72 flex items-center justify-center'>Already have an account?</Link>
          <p className='w-72 text-xs'>By Signing up, you agree to the Terms of Privacy Policy, including Cookie Use.</p>

        </SignUp.Root>
      </div>
    </div >
  )
}

export default SignUpPage