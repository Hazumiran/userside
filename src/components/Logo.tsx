import { Text, useColorModeValue } from '@chakra-ui/react';

const Logo = () => {
  const logoGradient = useColorModeValue(
    'linear(to-r, #ADD8E6, #FFFFFF)',
    'linear(to-r, #4299E1, #BEE3F8)'
  );

  return (
    <Text
      fontSize="2xl"
      fontWeight="bold"
      bgGradient={logoGradient}
      bgClip="text"
    >
      UserSide
    </Text>
  );
};

export default Logo;
