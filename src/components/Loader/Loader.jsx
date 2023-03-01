import { RotatingLines } from 'react-loader-spinner';
import { WrapperForLoader } from './Loader.styled';

const Loader = () => {
  return (
    <WrapperForLoader>
      <RotatingLines height="50" width="50" />
    </WrapperForLoader>
  );
};

export { Loader };
