import Image from 'next/image';

interface SlideProps {
  title: string;
  content: string;
  image: string;
}

export default function Slide({ title, content, image }: SlideProps) {
  return (
    <div className="flex flex-row items-start justify-center h-full p-8 space-x-6 overflow-hidden">
      <div className="flex-shrink-0 -ml-10">
        <Image 
          src={image} 
          alt={title} 
          width={300} 
          height={300} 
          className="rounded-lg w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto sm:mb-12" 
        />
      </div>
      <div className="flex flex-col max-w-xs mt-24 mb-12 space-y-4">
        <h2 className="text-2xl md:text-2xl font-extrabold mb-4">{title}</h2>
        <p className="text-base md:text-md font-light">
          {content}
        </p>
      </div>
    </div>
  );
} 