import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => (
  <MutatingDots
    height="100"
    width="100"
    color="#291507"
    secondaryColor="#291507"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{
      width: '100vw',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    visible={true}
  />
);
