import svgPaths from "./svg-ijp39lxd4a";
import imgFigma from "figma:asset/f31ed18891d0cc8d5371c85fad707f2ae6ff2bd2.png";
import imgRectangle2 from "figma:asset/88d4e4457f6a98bc06b5e293eaf03fc0861d2895.png";
import imgFrame5 from "figma:asset/ca9a718858cfe37006324f5bb4a9de2064b1dc2b.png";
import imgFrame427318949 from "figma:asset/c52db9fedfc627da221bde016a1265d92b1fd125.png";
import imgFrame427318954 from "figma:asset/2c8e1e7be1326897ea424952e7d2a3caa08bed80.png";
import imgFrame427318955 from "figma:asset/2b9a2551294648cfa5a71e37456f44dbe16ac270.png";

function Figma() {
  return (
    <div className="content-stretch flex h-[60px] items-center justify-center relative shrink-0 w-[64px]" data-name="Figma">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFigma} />
      <div className="h-[35px] relative shrink-0 w-[23.333px]" data-name="Icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Block() {
  return (
    <div className="content-stretch flex gap-[24px] h-[60px] items-center justify-center relative shrink-0 w-[64px]" data-name="Block">
      <Figma />
    </div>
  );
}

function NavigationPill1() {
  return (
    <div className="bg-[#75b06f] content-stretch flex h-[58px] items-center justify-center p-[8px] relative shrink-0" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[1.4]">Trái Cây</p>
      </div>
    </div>
  );
}

function NavigationPill() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Pill">
      <NavigationPill1 />
    </div>
  );
}

function NavigationPill2() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[1.4] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="mb-0">{`Rau, Củ &`}</p>
        <p>{`    Nấm `}</p>
      </div>
    </div>
  );
}

function NavigationPill3() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0 w-[161px]" data-name="Navigation Pill">
      <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white">
        <p className="leading-[1.4]">{`Thịt, Cá, Trứng & Hải Sản`}</p>
      </div>
    </div>
  );
}

function NavigationPill4() {
  return (
    <div className="content-stretch flex h-[60px] items-center justify-center p-[8px] relative rounded-[8px] shrink-0" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[1.4]">Thực Phẩm Khô</p>
      </div>
    </div>
  );
}

function NavigationPill6() {
  return (
    <div className="bg-[#75b06f] content-stretch flex h-[58px] items-center justify-center p-[8px] relative shrink-0" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[1.4]">Tin Tức</p>
      </div>
    </div>
  );
}

function NavigationPill5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Pill">
      <NavigationPill6 />
    </div>
  );
}

function NavigationPillList() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] h-[60px] items-start justify-end relative shrink-0 w-[590px]" data-name="Navigation Pill List">
      <NavigationPill />
      <NavigationPill2 />
      <NavigationPill3 />
      <NavigationPill4 />
      <NavigationPill5 />
    </div>
  );
}

function ShoppingCart() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="Shopping cart">
          <path d={svgPaths.p221ad500} id="Icon" stroke="var(--stroke-0, #FFFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Notifications() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="notifications">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="notifications">
          <path d={svgPaths.p3cb708b0} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="User">
          <path d={svgPaths.paf46c00} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex h-[22px] items-start relative shrink-0 w-[108px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[20px] text-nowrap text-white">Đăng Nhập</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex h-[22px] items-start relative shrink-0 w-[86px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[20px] text-nowrap text-white">| Đăng Ký</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[272px]">
      <User />
      <Text />
      <Text1 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#75b06f] h-[150px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[32px] relative size-full">
          <Block />
          <NavigationPillList />
          <ShoppingCart />
          <Notifications />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function SectionImage() {
  return (
    <div className="content-stretch flex flex-col h-[550px] items-start px-[25px] py-0 relative shrink-0 w-[1200px]" data-name="Section Image">
      <div className="h-[549px] relative rounded-[50px] shrink-0 w-full">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[50px] size-full" src={imgRectangle2} />
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Search">
          <path d={svgPaths.p182ce800} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white content-stretch flex h-[50px] items-center justify-between overflow-clip pl-[20px] pr-[10px] py-[10px] relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[600px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] w-[97px]">
        <p className="leading-[1.4]">Search here</p>
      </div>
      <Search />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pb-[25px] pl-[10px] pr-[25px] pt-0 relative w-full">
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function NavigationPill8() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Rau Ăn Lá</p>
      </div>
    </div>
  );
}

function NavigationPill7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Pill">
      <NavigationPill8 />
    </div>
  );
}

function NavigationPill9() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Củ, Quả</p>
      </div>
    </div>
  );
}

function NavigationPill10() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Nấm, Đậu Hủ</p>
      </div>
    </div>
  );
}

function NavigationPill11() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[252px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Kim Chi - Đồ Chua - Rong Nho</p>
      </div>
    </div>
  );
}

function Types() {
  return (
    <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-[807px]" data-name="Types">
      <NavigationPill7 />
      <NavigationPill9 />
      <NavigationPill10 />
      <NavigationPill11 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[80px] items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Heading">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.48px] w-[171px]">
        <p className="leading-[1.2]">{`Rau Củ & Nấm`}</p>
      </div>
      <Types />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,0,0,0.5)] w-[125px]">
        <p className="leading-[1.2]">{`Xem tất cả >`}</p>
      </div>
    </div>
  );
}

function Collection2() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-start overflow-clip relative shrink-0 w-full" data-name="Collection 01">
      <Heading />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star />
          <Star1 />
          <Star2 />
          <Star3 />
          <Star4 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame4 />
        <Frame5 />
        <Frame6 />
        <Frame7 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star5 />
          <Star6 />
          <Star7 />
          <Star8 />
          <Star9 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart2() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame12 />
        <Frame13 />
        <Frame14 />
        <Frame15 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star10 />
          <Star11 />
          <Star12 />
          <Star13 />
          <Star14 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart3() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart3 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame19 />
        <Frame20 />
        <Frame21 />
        <Frame22 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame2 />
          <Frame3 />
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star15 />
          <Star16 />
          <Star17 />
          <Star18 />
          <Star19 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart4() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart4 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame27 />
        <Frame28 />
        <Frame29 />
        <Frame30 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star20 />
          <Star21 />
          <Star22 />
          <Star23 />
          <Star24 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart5() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart5 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame38 />
      <Frame39 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame34 />
        <Frame35 />
        <Frame36 />
        <Frame37 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star25 />
          <Star26 />
          <Star27 />
          <Star28 />
          <Star29 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart6() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart6 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame45 />
      <Frame46 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame41 />
        <Frame42 />
        <Frame43 />
        <Frame44 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame26 />
          <Frame33 />
          <Frame40 />
        </div>
      </div>
    </div>
  );
}

function BodySection() {
  return (
    <div className="bg-white relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Body Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[25px] items-start p-[25px] relative w-full">
          <Collection2 />
          <Frame1 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function WrapBodySection() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start overflow-clip pb-[25px] pt-0 px-[25px] relative shrink-0 w-[1200px]" data-name="Wrap Body Section">
      <BodySection />
    </div>
  );
}

function NavigationPill13() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Thịt Heo</p>
      </div>
    </div>
  );
}

function NavigationPill12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Pill">
      <NavigationPill13 />
    </div>
  );
}

function NavigationPill14() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Thịt Bò</p>
      </div>
    </div>
  );
}

function NavigationPill15() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[120px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">{`Thịt Gà, Vịt & Chim`}</p>
      </div>
    </div>
  );
}

function NavigationPill16() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[252px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Cá, Hải Sản</p>
      </div>
    </div>
  );
}

function Types1() {
  return (
    <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-[642px]" data-name="Types">
      <NavigationPill12 />
      <NavigationPill14 />
      <NavigationPill15 />
      <NavigationPill16 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[80px] items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Heading">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.48px] w-[300px]">
        <p className="leading-[1.2]">{`Thịt, Cá, Trứng & Hải Sản`}</p>
      </div>
      <Types1 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,0,0,0.5)] w-[125px]">
        <p className="leading-[1.2]">{`Xem tất cả >`}</p>
      </div>
    </div>
  );
}

function Collection() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-start overflow-clip relative shrink-0 w-full" data-name="Collection 01">
      <Heading1 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star31() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star34() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame51() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star30 />
          <Star31 />
          <Star32 />
          <Star33 />
          <Star34 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart7() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart7 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame53 />
      <Frame54 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame49 />
        <Frame50 />
        <Frame51 />
        <Frame52 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star35() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star36() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star37() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star38() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star39() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star35 />
          <Star36 />
          <Star37 />
          <Star38 />
          <Star39 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart8() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart8 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame60 />
      <Frame61 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame56 />
        <Frame57 />
        <Frame58 />
        <Frame59 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame63() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star40() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star41() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star42() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star43() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star44() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame65() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star40 />
          <Star41 />
          <Star42 />
          <Star43 />
          <Star44 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart9() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart9 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame67 />
      <Frame68 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame63 />
        <Frame64 />
        <Frame65 />
        <Frame66 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame48 />
          <Frame55 />
          <Frame62 />
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star45() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star46() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star47() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star48() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star49() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame73() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star45 />
          <Star46 />
          <Star47 />
          <Star48 />
          <Star49 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart10() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart10 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame75 />
      <Frame76 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame71 />
        <Frame72 />
        <Frame73 />
        <Frame74 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame78() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star50() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star51() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star52() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star53() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star54() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame80() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star50 />
          <Star51 />
          <Star52 />
          <Star53 />
          <Star54 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart11() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart11 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame82 />
      <Frame83 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame78 />
        <Frame79 />
        <Frame80 />
        <Frame81 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame85() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star55() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star56() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star57() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star58() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star59() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame87() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star55 />
          <Star56 />
          <Star57 />
          <Star58 />
          <Star59 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart12() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart12 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame89 />
      <Frame90 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame85 />
        <Frame86 />
        <Frame87 />
        <Frame88 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame69() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame70 />
          <Frame77 />
          <Frame84 />
        </div>
      </div>
    </div>
  );
}

function BodySection1() {
  return (
    <div className="bg-white relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Body Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[25px] items-start p-[25px] relative w-full">
          <Collection />
          <Frame47 />
          <Frame69 />
        </div>
      </div>
    </div>
  );
}

function WrapBodySection1() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start overflow-clip p-[25px] relative shrink-0 w-[1200px]" data-name="Wrap Body Section">
      <BodySection1 />
    </div>
  );
}

function NavigationPill18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Navigation Pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
            <p className="leading-[1.4]">Hạt, Trái Cây Sấy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationPill17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[150px]" data-name="Navigation Pill">
      <NavigationPill18 />
    </div>
  );
}

function NavigationPill19() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[150px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">Khô Chế Biến Sẵn</p>
      </div>
    </div>
  );
}

function NavigationPill20() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[77px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">&nbsp;</p>
      </div>
    </div>
  );
}

function NavigationPill21() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center opacity-80 p-[8px] relative shrink-0 w-[77px]" data-name="Navigation Pill">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[1.4]">&nbsp;</p>
      </div>
    </div>
  );
}

function Types2() {
  return (
    <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-[659px]" data-name="Types">
      <NavigationPill17 />
      <NavigationPill19 />
      <NavigationPill20 />
      <NavigationPill21 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[80px] items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Heading">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[300px]">
        <p className="leading-[1.4]">Thực Phẩm Khô</p>
      </div>
      <Types2 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(0,0,0,0.5)] w-[125px]">
        <p className="leading-[1.2]">{`Xem tất cả >`}</p>
      </div>
    </div>
  );
}

function Collection1() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-start overflow-clip relative shrink-0 w-full" data-name="Collection 01">
      <Heading2 />
    </div>
  );
}

function Frame93() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star60() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star61() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star62() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star63() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star64() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame95() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star60 />
          <Star61 />
          <Star62 />
          <Star63 />
          <Star64 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart13() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart13 />
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame97 />
      <Frame98 />
    </div>
  );
}

function Frame92() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame93 />
        <Frame94 />
        <Frame95 />
        <Frame96 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame100() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star65() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star66() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star67() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star68() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star69() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame102() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star65 />
          <Star66 />
          <Star67 />
          <Star68 />
          <Star69 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart14() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart14 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame104 />
      <Frame105 />
    </div>
  );
}

function Frame99() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame100 />
        <Frame101 />
        <Frame102 />
        <Frame103 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame107() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star70() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star71() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star72() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star73() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star74() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame109() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star70 />
          <Star71 />
          <Star72 />
          <Star73 />
          <Star74 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart15() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart15 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame111 />
      <Frame112 />
    </div>
  );
}

function Frame106() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame107 />
        <Frame108 />
        <Frame109 />
        <Frame110 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame91() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame92 />
          <Frame99 />
          <Frame106 />
        </div>
      </div>
    </div>
  );
}

function Frame115() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star75() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star76() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star77() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star78() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star79() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame117() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star75 />
          <Star76 />
          <Star77 />
          <Star78 />
          <Star79 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart16() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart16 />
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame119 />
      <Frame120 />
    </div>
  );
}

function Frame114() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame115 />
        <Frame116 />
        <Frame117 />
        <Frame118 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame122() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star80() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star81() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star82() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star83() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star84() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame124() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star80 />
          <Star81 />
          <Star82 />
          <Star83 />
          <Star84 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart17() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart17 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame126 />
      <Frame127 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame122 />
        <Frame123 />
        <Frame124 />
        <Frame125 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame129() {
  return (
    <div className="h-[240px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame5} />
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-between overflow-clip px-[20px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[1.4]">Dâu Hàn Quốc 250g (I0004758)</p>
      </div>
    </div>
  );
}

function Star85() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star86() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star87() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star88() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Star89() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_1223)" id="Star">
          <path d={svgPaths.p388c8d00} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame131() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-start px-[20px] py-[5px] relative w-full">
          <Star85 />
          <Star86 />
          <Star87 />
          <Star88 />
          <Star89 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#63b45b] text-[16px] w-[180px]">
            <p className="leading-[1.4]">(25)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[125px] items-start leading-[0] not-italic overflow-clip pl-[25px] pr-0 py-[10px] relative shrink-0 w-[170px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4]">625 Đã bán</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center relative shrink-0 text-[#63b45b] text-[24px] tracking-[-0.48px] w-full">
        <p className="leading-[1.2]">125.000 đ</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center relative shrink-0 text-[0px] text-[rgba(0,0,0,0.5)] w-full">
        <p className="leading-[1.4] text-[16px]">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal line-through not-italic">150.000 đ</span>
          <span>{` -17%`}</span>
        </p>
      </div>
    </div>
  );
}

function ShoppingCart18() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Shopping cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Shopping cart">
          <path d={svgPaths.pe191770} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-center overflow-clip px-[61px] py-[34px] relative shrink-0 w-[170px]">
      <ShoppingCart18 />
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex h-[125px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame133 />
      <Frame134 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="h-full relative rounded-[30px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame129 />
        <Frame130 />
        <Frame131 />
        <Frame132 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function Frame113() {
  return (
    <div className="h-[500px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-between p-[10px] relative size-full">
          <Frame114 />
          <Frame121 />
          <Frame128 />
        </div>
      </div>
    </div>
  );
}

function BodySection2() {
  return (
    <div className="bg-white relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Body Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[25px] items-start p-[25px] relative w-full">
          <Collection1 />
          <Frame91 />
          <Frame113 />
        </div>
      </div>
    </div>
  );
}

function WrapBodySection2() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start overflow-clip p-[25px] relative shrink-0 w-[1200px]" data-name="Wrap Body Section">
      <BodySection2 />
    </div>
  );
}

function Frame136() {
  return (
    <div className="bg-[#75b06f] h-[90px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[25px] py-0 relative size-full">
          <div className="basis-0 flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold grow h-full justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[32px] text-white">
            <p className="leading-[1.4]">AGRISHOW</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame140() {
  return (
    <div className="h-[280px] relative shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgFrame427318949} />
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[50px] items-center justify-between leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] w-full">
      <div className="flex flex-col h-full justify-center relative shrink-0 w-[300px]">
        <p className="leading-[1.4]">
          <span>{`Đăng bởi: `}</span>
          <span className="text-black">Admin</span>
        </p>
      </div>
      <div className="flex flex-col h-full justify-center relative shrink-0 w-[300px]">
        <p className="leading-[1.4]">ngày 22/10/2025</p>
      </div>
    </div>
  );
}

function Frame138() {
  return (
    <div className="basis-0 grow h-[450px] min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-between px-[25px] py-0 relative size-full">
          <Frame140 />
          <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full">
            <p className="leading-[1.4]">Tuyển sỉ quà Tết 2026 cùng Foodmap – Đồng hành cùng doanh nghiệp trong hành trình trao gửi tri ân và giá trị Việt</p>
          </div>
          <Frame141 />
        </div>
      </div>
    </div>
  );
}

function Frame143() {
  return (
    <div className="h-[220px] relative shrink-0 w-[272px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[79.55%] left-0 max-w-none top-[10.23%] w-full" src={imgFrame427318954} />
      </div>
    </div>
  );
}

function Frame144() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold items-center not-italic pl-[10px] pr-0 py-0 relative size-full text-[16px] text-black">
          <div className="flex flex-col h-[110px] justify-center leading-[0] relative shrink-0 w-full">
            <p className="leading-[1.4]">Foodmap Tuyển Sỉ Bánh Trung Thu 2025 – Giá Chiết Khấu Siêu Hấp Dẫn</p>
          </div>
          <div className="flex flex-col h-[79px] justify-center leading-[1.4] relative shrink-0 w-full">
            <p className="mb-0">
              <span className="text-[rgba(0,0,0,0.5)]">Đăng bởi:</span>
              <span>{` Admin   `}</span>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="text-[rgba(0,0,0,0.5)]">Ngày 10/09/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame142() {
  return (
    <div className="content-stretch flex h-[220px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame143 />
      <Frame144 />
    </div>
  );
}

function Frame146() {
  return (
    <div className="h-[220px] relative shrink-0 w-[272px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[79.55%] left-0 max-w-none top-[10.23%] w-full" src={imgFrame427318955} />
      </div>
    </div>
  );
}

function Frame147() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold items-center not-italic pl-[10px] pr-0 py-0 relative size-full text-[16px] text-black">
          <div className="flex flex-col h-[110px] justify-center leading-[0] relative shrink-0 w-full">
            <p className="leading-[1.4]">Foodmap Tuyển Sỉ Bánh Trung Thu 2025 – Giá Chiết Khấu Siêu Hấp Dẫn</p>
          </div>
          <div className="flex flex-col h-[79px] justify-center leading-[1.4] relative shrink-0 w-full">
            <p className="mb-0">
              <span className="text-[rgba(0,0,0,0.5)]">Đăng bởi:</span>
              <span>{` Admin   `}</span>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="text-[rgba(0,0,0,0.5)]">Ngày 09/09/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame145() {
  return (
    <div className="content-stretch flex h-[220px] items-center justify-between overflow-clip relative shrink-0 w-full">
      <Frame146 />
      <Frame147 />
    </div>
  );
}

function Frame139() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between overflow-clip relative self-stretch shrink-0 w-[525px]">
      <Frame142 />
      <Frame145 />
    </div>
  );
}

function Frame137() {
  return (
    <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full">
      <Frame138 />
      <Frame139 />
    </div>
  );
}

function Frame135() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start px-[25px] py-0 relative w-full">
          <Frame136 />
          <Frame137 />
        </div>
      </div>
    </div>
  );
}

function Figma1() {
  return (
    <div className="h-[60px] relative shrink-0 w-[64px]" data-name="Figma">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFigma} />
    </div>
  );
}

function XLogo() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.98px]" data-name="X Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.98 24">
        <g id="X Logo">
          <path d={svgPaths.p16d01100} fill="var(--fill-0, #1E1E1E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function LogoInstagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo Instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1214)" id="Logo Instagram">
          <path d={svgPaths.p3c382d72} fill="var(--fill-0, #1E1E1E)" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_1_1214">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoYouTube() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo YouTube">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1240)" id="Logo YouTube">
          <path d={svgPaths.p13f17d00} fill="var(--fill-0, #1E1E1E)" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_1_1240">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="LinkedIn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1209)" id="LinkedIn">
          <path d={svgPaths.p167f5280} fill="var(--fill-0, #1E1E1E)" id="Icon" />
        </g>
        <defs>
          <clipPath id="clip0_1_1209">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonList() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Button List">
      <XLogo />
      <LogoInstagram />
      <LogoYouTube />
      <LinkedIn />
    </div>
  );
}

function Title() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col gap-[24px] items-start min-w-[240px] relative shrink-0 w-[262px]" data-name="Title">
      <Figma1 />
      <ButtonList />
    </div>
  );
}

function TextStrong() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text Strong">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">Use cases</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full" data-name="Title">
      <TextStrong />
    </div>
  );
}

function TextLinkListItem() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">UI design</p>
      </div>
    </div>
  );
}

function TextLinkListItem1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">UX design</p>
      </div>
    </div>
  );
}

function TextLinkListItem2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Wireframing</p>
      </div>
    </div>
  );
}

function TextLinkListItem3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Diagramming</p>
      </div>
    </div>
  );
}

function TextLinkListItem4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Brainstorming</p>
      </div>
    </div>
  );
}

function TextLinkListItem5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Online whiteboard</p>
      </div>
    </div>
  );
}

function TextLinkListItem6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Team collaboration</p>
      </div>
    </div>
  );
}

function TextLinkList() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[262px]" data-name="Text Link List">
      <Title1 />
      <TextLinkListItem />
      <TextLinkListItem1 />
      <TextLinkListItem2 />
      <TextLinkListItem3 />
      <TextLinkListItem4 />
      <TextLinkListItem5 />
      <TextLinkListItem6 />
    </div>
  );
}

function TextStrong1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text Strong">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">Explore</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full" data-name="Title">
      <TextStrong1 />
    </div>
  );
}

function TextLinkListItem7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Design</p>
      </div>
    </div>
  );
}

function TextLinkListItem8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Prototyping</p>
      </div>
    </div>
  );
}

function TextLinkListItem9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Development features</p>
      </div>
    </div>
  );
}

function TextLinkListItem10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Design systems</p>
      </div>
    </div>
  );
}

function TextLinkListItem11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Collaboration features</p>
      </div>
    </div>
  );
}

function TextLinkListItem12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Design process</p>
      </div>
    </div>
  );
}

function TextLinkListItem13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">FigJam</p>
      </div>
    </div>
  );
}

function TextLinkList1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[262px]" data-name="Text Link List">
      <Title2 />
      <TextLinkListItem7 />
      <TextLinkListItem8 />
      <TextLinkListItem9 />
      <TextLinkListItem10 />
      <TextLinkListItem11 />
      <TextLinkListItem12 />
      <TextLinkListItem13 />
    </div>
  );
}

function TextStrong2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text Strong">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">Resources</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full" data-name="Title">
      <TextStrong2 />
    </div>
  );
}

function TextLinkListItem14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Blog</p>
      </div>
    </div>
  );
}

function TextLinkListItem15() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Best practices</p>
      </div>
    </div>
  );
}

function TextLinkListItem16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Colors</p>
      </div>
    </div>
  );
}

function TextLinkListItem17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Color wheel</p>
      </div>
    </div>
  );
}

function TextLinkListItem18() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Support</p>
      </div>
    </div>
  );
}

function TextLinkListItem19() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Developers</p>
      </div>
    </div>
  );
}

function TextLinkListItem20() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text Link List Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap">
        <p className="leading-[1.4]">Resource library</p>
      </div>
    </div>
  );
}

function TextLinkList2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[262px]" data-name="Text Link List">
      <Title3 />
      <TextLinkListItem14 />
      <TextLinkListItem15 />
      <TextLinkListItem16 />
      <TextLinkListItem17 />
      <TextLinkListItem18 />
      <TextLinkListItem19 />
      <TextLinkListItem20 />
    </div>
  );
}

function Footer() {
  return (
    <div className="[grid-area:1_/_1] content-start flex flex-wrap gap-[16px] h-[350px] items-start ml-0 mt-[90px] overflow-clip pb-[160px] pt-0 px-[32px] relative w-[1189.1px]" data-name="Footer" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 244, 244) 0%, rgb(244, 244, 244) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Title />
      <TextLinkList />
      <TextLinkList1 />
      <TextLinkList2 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <div className="[grid-area:1_/_1] h-[65px] ml-0 mt-0 relative w-[1200px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 65">
          <path d="M0 0H1200V65H0V0Z" fill="var(--fill-0, #75B06F)" id="Rectangle 1" />
        </svg>
      </div>
      <Footer />
    </div>
  );
}

export default function ExamplesHomePage() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start relative size-full" data-name="Examples / Home Page" style={{ backgroundImage: "linear-gradient(90deg, rgb(244, 244, 244) 0%, rgb(244, 244, 244) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Header />
      <SectionImage />
      <Frame10 />
      <WrapBodySection />
      <WrapBodySection1 />
      <WrapBodySection2 />
      <Frame135 />
      <Group />
    </div>
  );
}