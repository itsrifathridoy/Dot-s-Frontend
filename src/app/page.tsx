
import HomePageComponent from './homepage/page';

import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      
      <div className=""> {/* Offset for fixed navbar */}
        <HomePageComponent />
        <div>

        </div>
      </div>
    </div>
    

  );
}
