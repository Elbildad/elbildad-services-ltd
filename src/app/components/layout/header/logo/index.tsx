import Image from 'next/image';
import Link from 'next/link';
import { getImgPath } from '@/utils/pathUtils';

const Logo: React.FC = () => {

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={getImgPath("/images/logo/elbildad-logo.png")}
        alt="Elbildad Services Logo"
        width={50}
        height={50}
        className="h-10 w-auto object-contain"
        quality={100}
      />
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-midnight_text dark:text-white tracking-tight">Elbildad</span>
        <span className="text-xs font-medium text-primary uppercase tracking-widest">Services</span>
      </div>
    </Link>
  );
};

export default Logo;