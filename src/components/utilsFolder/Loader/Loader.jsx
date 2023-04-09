import scss from './loader.module.scss';

import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={scss.loading__modal}>
      <Hearts
        height="100"
        width="100"
        color="#F59256"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
