import { mapState } from '@/atom';
import { MdOutlineMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import FullPageLoader from '../common/FullPageLoader';
import { useState } from 'react';

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleMoveCurrentLocation = () => {
    setLoading(true);
    // 메인 페이지 진입시 HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    // https://apis.map.kakao.com/web/sample/geolocationMarker/
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success('현재 위치로 이동되었습니다.');
          }
          return currentPosition;
        },
        () => {
          toast.error('현재 위치를 가져올 수 없습니다.');
          setLoading(false);
        },
        options
      );
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={handleMoveCurrentLocation}
        className="fixed z-10 p-2 shadow right-5 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-gray-100"
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </>
  );
}
