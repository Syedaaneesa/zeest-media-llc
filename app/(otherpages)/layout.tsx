import Footer from '@/components/globals/Footer'
import Navbar from '@/components/globals/Navbar'
import Whatsapp from '@/components/globals/Whatsapp'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-white">

            <Navbar />
                {children}
            <Whatsapp />
            <Footer />
        </div>
    )
}

export default layout