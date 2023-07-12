import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bubbleLocAtom, mouseLocAtom } from '../atoms/post';
import { BUBBLEBENCHMARK } from '../constants/common';

export default function useBubbleLocation() {
  const setBubbleLoc = useSetRecoilState(bubbleLocAtom);
  const mouseLoc = useRecoilValue(mouseLocAtom);
  const { x, y } = mouseLoc;
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
  }, [mouseLoc]);

  return null;
}
