import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/menu-kreatif-logo.svg'
        alt='menu kreatif logo'
        width={200}
        height={200}
      />
    </Link>
  );
};

export default Logo;
