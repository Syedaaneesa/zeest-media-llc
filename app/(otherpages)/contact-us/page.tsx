"use client"
import { Suspense } from 'react'
import ContactUs from '@/components/contact/ContactUs'
import { Loader } from 'lucide-react'

const page = () => {
  return (
    <Suspense fallback={<Loader className='animate-spin' />}>
      <ContactUs />
    </Suspense>
  )
}

export default page