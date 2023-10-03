"use client";

import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={22}
      width={22}
      color='#eaeaea'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='#eaeaea'
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
