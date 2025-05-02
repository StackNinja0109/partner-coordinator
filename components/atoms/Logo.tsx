'use client'

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string,
  color: 'white' | 'blue',
  size: 'pc' | 'sp',
  homeUrl: string,
}

const Logo: React.FC<LogoProps> = ({ className = '', color, size, homeUrl }) => {
  return (
    <h1>
      <Link href={homeUrl} className={`inline-block ${className}`}>
        { color === 'white' && size === 'pc' && (
          <Image src="/images/logo/logo_white_pc.svg" width={202} height={26} alt="スポカル人材バンク" />
        )}
        { color === 'white' && size === 'sp' && (
          <Image src="/images/logo/logo_white_sp.svg" width={106} height={14} alt="スポカル人材バンク" />
        )}
        { color === 'blue' && size === 'pc' && (
          <Image src="/images/logo/logo_blue_pc.svg" width={202} height={26} alt="スポカル人材バンク" />
        )}
        { color === 'blue' && size === 'sp' && (
          <Image src="/images/logo/logo_blue_sp.svg" width={106} height={14} alt="スポカル人材バンク" />
        )}
      </Link>
    </h1>
  );
}

export default Logo;