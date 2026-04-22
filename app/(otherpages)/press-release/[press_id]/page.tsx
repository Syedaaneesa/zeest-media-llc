
import { createSupabaseServerClient } from '@/lib/server';
import PressContent from '@/components/dashboard/PressContent';

export default async function PressReleasePublic({ params }: { params: { press_id: string } }) {

  const { press_id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: pressRelease, error } = await supabase.from('press_release').select('*').eq('id', press_id).single();

  return (
    <div className="min-h-screen mt-20">

      {/* Main Content */}

      {!error && pressRelease && <PressContent pressRelease={pressRelease} error={error} />}
  
      
      {error && (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Press Release Not Found</h1>
          <p className="text-gray-500">The press release you are looking for does not exist or has been removed or some other reason.</p>
        </div>
      )}
    </div>
  );
}