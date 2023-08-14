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
    leftWeighting,
    rightWeighting,
    yPositionBenchmark,
  } = BUBBLEBENCHMARK;

  useEffect(() => {
    let edgeLeft = 50;
    if (x > rightBenchmark) {
      edgeLeft = rightDefaultValue + (x - rightBenchmark - 0.5) * rightWeighting;
    } else if (x < leftBenchmark) {
      edgeLeft = leftDefaultValue + (x - leftDefaultValue) * leftWeighting;
    }
    if (y < yPositionBenchmark) {
      edgeLeft = edgeLeft - 2.5;
    }

    setBubbleLoc({
      x: x < leftBenchmark ? leftBenchmark : x > rightBenchmark ? rightBenchmark : x,
      y: y > yPositionBenchmark ? y - 7 : y + 27,
      bubbleUp: y >= yPositionBenchmark,
      edgeLeft: edgeLeft,
    });
  }, [pinLoc]);

  return bubbleLoc;
}
