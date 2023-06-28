import Link from 'next/link'
import Image from 'next/image'
import AuthProviders from './AuthProviders'
import { NavLinks } from '@/constants'
const Navbar = () => {
    const session={}
  return (
    <nav className='flexBetween navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href='/'>
                <Image
                    src='/logo.svg'
                    alt='flexible'
                    width={115}
                    height={43}
                />
            </Link>
            <ul className='xl:flex text-small hidden gap-7'>
                {NavLinks.map((link) => (
                    <Link href={link.href} key={link.key}>
                        {link.text}
                    </Link>
                ))}
            </ul>
        </div>
        <div className='flexCenter gap-4'>
            {session?(
                <>
                    User Photo
                    <Link href='/create-project'>
                        Share Work
                    </Link>
                </>
            ):<AuthProviders/>}        
        </div>
    </nav>
  )
}

export default Navbar