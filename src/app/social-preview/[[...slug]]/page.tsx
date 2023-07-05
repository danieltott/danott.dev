import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getMetaAndOptions } from '@/lib/socialImages';

export default async function Preview({
  params,
}: {
  params: { slug: string[] };
}) {
  try {
    const { meta, options } = await getMetaAndOptions(params.slug?.join('/'));

    return (
      <div
        style={{
          position: 'fixed',
          background: '#fff',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: options.width,
            height: options.height,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <SocialCard meta={meta} preview />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
