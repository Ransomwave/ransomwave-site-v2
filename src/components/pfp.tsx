import Image from "next/image";

const ProfilePicture = () => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="relative">
        <Image
          src="/images/pfp.webp"
          alt="Ransomwave PFP"
          width={200}
          height={200}
          className="border-2 border-white/90 shadow-lg shadow-black object-cover transform scale-110 hover:scale-120 transition-transform duration-300 ease-in-out md:w-[200px] md:h-[200px] w-[150px] h-[150px]"
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
