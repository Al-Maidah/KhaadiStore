import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function NowHappening() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Now Happening | Khaadi";
  }, []);

  return (
    <div 
      onClick={() => navigate('/readytowear')}
      style={{ 
        cursor: 'pointer', 
        width: '100%', 
        overflow: 'hidden' 
      }}
    >
      <img 
        src="https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw299713b7/images/NOW-AFFAIR-desktop-banner-B2-Classic-Affair-1.jpg" 
        alt="Now Happening - Summer Pastel Fever" 
        style={{ 
          width: '100%', 
          height: 'auto', 
          display: 'block' 
        }} 
      />
    </div>
  );
}