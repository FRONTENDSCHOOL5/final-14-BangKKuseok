import { useEffect, useState } from 'react';
import { BUBBLEBENCHMARK } from '../constants/common';

export default function useBubbleLocation(pinLoc) {
  const [bubbleLoc, setBubbleLoc] = useState({ x: 50, y: 50, bubleUp: true, edgeLeft: 50 });
  const { x, y } = pinLoc;
  const {
    leftBenchmark,
    rightBenchmark,
    leftDefaultValue,
    rightDefaultValue,
    xWeighting,
    edgeLeftDefaultValue,
    edgeRightDefaultValue,
    edgeLeftWeighting,
    edgeRightWeighting,
    yPositionBenchmark,
  } = BUBBLEBENCHMARK;

  useEffect(() => {
    let xForCalc = -94;
    let edgeLeft = 50;

    if (x > rightBenchmark) {
      xForCalc = rightDefaultValue - (x - rightBenchmark) * xWeighting;
      edgeLeft = edgeRightDefaultValue + (x - rightBenchmark) * edgeRightWeighting;
    } else if (x < leftBenchmark) {
      xForCalc = leftDefaultValue - (x + leftDefaultValue - 2) * xWeighting;
      edgeLeft = edgeLeftDefaultValue + (x - edgeLeftDefaultValue + 1) * edgeLeftWeighting;
    }

    setBubbleLoc({
      x: xForCalc,
      edgeLeft: edgeLeft < 6 ? 6 : edgeLeft > 94 ? 94 : edgeLeft,
      bubbleUp: y >= yPositionBenchmark,
    });
  }, [pinLoc]);

  return bubbleLoc;
}
