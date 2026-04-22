import dynamic from 'next/dynamic';

const WorldMapLeaflet = dynamic(
  () => import('./WorldMapLeaflet.client'),
  { ssr: false }
);

export default WorldMapLeaflet;
