import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/chat">
      <Image alt="hello" src="/landing-page.png" width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}/> 
    </Link>
  );
}
