import {BsShieldFillCheck} from "react-icons/bs";
import {BiSearchAlt} from "react-icons/bi";
import {RiHeart2Fill} from "react-icons/ri";
import {FC} from "react";


interface ServiceCardProps {
    color: string;
    title: string;
    icon: any;
    subtitle: string;
}

const ServiceCard: FC<ServiceCardProps> = ({color, icon, subtitle, title}) => (
    <div className={'flex justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'}>
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className={'ml-5 flex flex-col flex-1'}>
        <h3 className={'mt-2 text-white text-lg'}>{title}</h3>
        <p className={'mt-2 text-white text-sm md:w-9/12'}>{subtitle}</p>
      </div>
    </div>
)

const Services = () => {
  return (
      <div className={'flex w-full flex-col sm:flex-row justify-center items-center gradient-bg-services'}>
        <div className={'flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'}>
          <div className={'flex-1 flex flex-col justify-start items-center'}>
            <h1 className={'text-white text-3xl sm:text-5xl py-2 text-gradient'}>Services that we
              <br /> continue to improve</h1>
          </div>
        </div>
        <div className={'flex-1 flex flex-col justify-start items-center'}>
            <ServiceCard
                color={'bg-[#2952E3]'}
                title={'Security Guaranteed'}
                icon={<BsShieldFillCheck fontSize={21} className={'text-white'} />}
                subtitle={'Security is guaranteed with our system. Many security features are embedded in our system.'}
            />
          <ServiceCard
              color={'bg-[#8945F8]'}
              title={'Easy to Use'}
              icon={<BiSearchAlt fontSize={21} className={'text-white'} />}
              subtitle={'Security is guaranteed with our system. Many security features are embedded in our system.'}
          />
          <ServiceCard
              color={'bg-[#F84550]'}
              title={'FastEST Transactions'}
              icon={<RiHeart2Fill fontSize={21} className={'text-white'} />}
              subtitle={'Security is guaranteed with our system. Many security features are embedded in our system.'}
          />
        </div>
      </div>
  );
};

export default Services;
