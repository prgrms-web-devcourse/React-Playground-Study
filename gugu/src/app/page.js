import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      Hello WEB
      <p>
        <Image src="/next.svg" alt="main icon" width={100} height={100} />
      </p>
    </>
  );
}
