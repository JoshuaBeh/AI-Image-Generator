import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export default function IsLoadingSpinner() {
  return (
    <div className='row center vh-80'>
      <ThreeCircles
        height="60"
        width="60"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
