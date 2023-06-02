/*global kakao*/
import { Dispatch, SetStateAction } from 'react';
import { StoreType } from '@/interface';
import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  setCurrentStore?: Dispatch<SetStateAction<StoreType | null>>;
  lat?: number;
  lng?: number;
  zoom?: number;
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

const DEFAULT_ZOOM = 3;

export default function Map({
  setMap,
  setCurrentStore,
  lat,
  lng,
  zoom,
}: MapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat || DEFAULT_LAT,
          lng || DEFAULT_LNG
        ),
        level: zoom || DEFAULT_ZOOM,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (setCurrentStore) {
        // 지도에 클릭 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', () => {
          setCurrentStore(null);
        });
      }
      setMap(map);

      if (mapContainer && lat && lng) {
        mapContainer.style.height = '600px';

        map.relayout();
      }
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
