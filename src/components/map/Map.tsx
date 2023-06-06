'use client';

/*global kakao*/
import Script from 'next/script';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mapState, currentStoreState, locationState } from '@/atom';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');

      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat || location?.lat,
          lng || location?.lng
        ),
        level: zoom || location?.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      if (setCurrentStore) {
        // 지도에 클릭 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', () => {
          setCurrentStore(null);
        });
      }
      setMap(map);

      // 상세 페이지에서 map 크기 조절
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
