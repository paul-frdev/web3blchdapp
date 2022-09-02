import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import { ServiceCard } from './shared/ServiceCard';

export const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient text-left">
            Services that we <br /> continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security Guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guarantee. We always maintain privacy and mainting the quality of products."
        />
        <ServiceCard
          color="bg-[#8945f8]"
          title="Security Guaranteed"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Security is guarantee. We always maintain privacy and mainting the quality of products."
        />
        <ServiceCard
          color="bg-[#f84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Security is guarantee. We always maintain privacy and mainting the quality of products."
        />
      </div>
    </div>
  );
};
