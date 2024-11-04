import Image from 'next/image';

interface SlideProps {
  title: string;
  content: string;
  image: string;
}

export default function Slide({ title, content, image }: SlideProps) {
  return (
    <div className="flex flex-row items-start justify-center h-full p-4 sm:p-8 space-x-4 sm:space-x-6 overflow-hidden">
      <div className="flex-shrink-0 -ml-4 sm:-ml-10">
        <Image 
          src={image} 
          alt={title} 
          width={250} 
          height={250} 
          className="rounded-lg w-[120px] sm:w-[180px] md:w-[220px] lg:w-[250px] h-auto" 
        />
      </div>
      <div className="flex flex-col max-w-xs mt-8 md:mt-24 space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2">{title}</h2>
        <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed" style={{ textIndent: '1em' }}>
          {content}
        </p>
      </div>
    </div>
  );
} 