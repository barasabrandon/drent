import { BounceLoader } from 'react-spinners';
import { useTheme } from 'next-themes';

export default function Spinner() {
  const { resolvedTheme } = useTheme();
  const getStrokeColor = () => {
    return resolvedTheme === 'dark' ? '#6b7280' : '#1E3A8A'; // Set the desired colors for dark and light themes
  };
  return (
    <BounceLoader
      color={resolvedTheme === 'dark' ? '#6b7280' : '#1E3A8A'}
      speedMultiplier={2}
    />
  );
}
