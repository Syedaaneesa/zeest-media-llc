import { createSupabaseServerClient } from '@/lib/server'
import AIPRWriter from './AIWriter'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: ' AI Press Release Writer',
  description: 'Generate professional press releases in seconds with our AI-powered writer. Simply provide a topic, and let our advanced algorithms craft a compelling release for you.',
  keywords: ['AI press release writer', 'generate press release', 'professional press release', 'AI content creation', 'press release generator'],
  openGraph: {
    title: 'AI Press Release Writer',
    description: 'Generate professional press releases in seconds with our AI-powered writer. Simply provide a topic, and let our advanced algorithms craft a compelling release for you.',
    images: [
      {
        url: 'https://example.com/og-image.jpg',  
        width: 1200,
        height: 630,
        alt: 'AI Press Release Writer',
      },
    ],
  },
};


const page = async() => {

  const supabase = await createSupabaseServerClient()

  const { data: { user }} = await supabase.auth.getUser();

  let usageRes = null;

  if (user) {
    usageRes = await supabase.from('ai_press_release_usage')
      .select('request_count, last_reset')
      .eq('user_id', user.id)
      .single();
  }

  return (
    <AIPRWriter user={user} usage={usageRes?.data} />
  )
}

export default page;