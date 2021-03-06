import * as React from 'react';
import { View } from 'react-native';
import { CircleButton } from '../../../components/CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Balloon } from './Balloon';
import { wait } from '../../../utils/wait';
import { useCallback } from 'react';
import {
  BalloonType,
  getBalloonDisplayX,
  getRandomColor,
  getRandomShape,
} from './helpers';
import { ScreenWrapper } from '../../../components/ScreenWrapper';

const dx = 25;

/**
 * Shoot confetti everywhere
 */
export const LoveView: React.FC = () => {
  // Local state
  const [isPressed, setIsPressed] = React.useState(false);
  const [currX, setCurrX] = React.useState(0);
  const [balloons, setBalloons] = React.useState([] as BalloonType[]);

  // On press in/out
  const onPressIn = () => setIsPressed(true);
  const onPressOut = () => setIsPressed(false);

  // Add balloon
  const addBalloon = () => {
    setCurrX((ang) => ang + dx);
    setBalloons((oldBalloons) =>
      oldBalloons.concat({
        x: currX,
        displayX: getBalloonDisplayX(currX),
        color: getRandomColor(),
        size: 45,
        shape: getRandomShape(),
      }),
    );
  };

  const removeBalloon = useCallback((balloon: BalloonType) => {
    setBalloons((oldBalloons) => oldBalloons.filter((b) => b !== balloon));
  }, []);

  // Effect to add balloon
  React.useEffect(() => {
    if (!isPressed) return;
    wait(50).then(addBalloon);
  }, [isPressed, currX]);

  return (
    <ScreenWrapper
      title="Love Blast"
      subtitle="See /views/Examples/Love/Love.view.tsx"
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {balloons.map((balloon) => (
          <Balloon
            key={`balloon-${balloon.x}`}
            balloon={balloon}
            removeBalloon={removeBalloon}
          />
        ))}
        <CircleButton onPressIn={onPressIn} onPressOut={onPressOut}>
          <MaterialCommunityIcons name="air-horn" size={30} />
        </CircleButton>
      </View>
    </ScreenWrapper>
  );
};
