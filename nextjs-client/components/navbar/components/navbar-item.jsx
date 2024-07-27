"use client";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// const courses = [1, 2, 3, 4];
const NavbarItem = ({
  title,
  courses,
  university,
  isPanelActive,
  logo,
  closePanel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!title) {
  //     return;
  //   }
  //   if (title === "KTU") {
  //     setIsOpen(true);
  //   }
  // }, [title]);

  // useEffect(() => {
  //   if (!isPanelActive) {
  //     setIsOpen(false);
  //   }
  // }, [isPanelActive]);

  const handleNavigate = (course) => {
    router.replace(`/streams/${course}`);
  };

  return (
    <div className="m-2 min-h-10 cursor-pointer flex flex-col items-center relative">
      <div
        className={`w-full h-10 pl-2 rounded-t-lg flex items-center ${
          isOpen ? "bg-gray-900" : "bg-transparent"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          // src={logo}
          className="w-3 object-contain object-center mr-2 opacity-50"
        />
        <p>{title}</p>
      </div>
      <div
        className={`w-full pl-2 transition-height duration-300 ${
          isOpen ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        {courses?.map((item, index) => (
          <div
            className="h-6 my-2 rounded-lg pl-2 text-sm cursor-pointer hover:opacity-100 transition-opacity duration-200"
            onClick={() => handleNavigate(item?.slug)}
            key={index}
          >
            <p className="opacity-70">{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarItem;
