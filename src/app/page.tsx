import LeftIcon from '@/assets/icons/icon-arrow-left.svg';
import ClockIcon from '@/assets/icons/icon-clock.svg';

export default function Home() {
  return (
    <p>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 font-p font-medium">
        HomePage
        <LeftIcon
          width={100}
          height={100}
          fill="#8782D4"
          stroke="#8782D4"
          color="#8782D4"
        />
        <ClockIcon
          width={30}
          height={30}
          fill="#D4B382"
          stroke="#D4B382"
          color="#D4B382"
        />
      </main>
    </p>
  );
}
