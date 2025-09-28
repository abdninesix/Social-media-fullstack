import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

const Homepage = async () => {

  return (
    <div className="w-full">
      <div className='px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray'>
        <Link className="pb-3 flex items-center border-b-4 border-iconBlue" href="/">For you</Link>
        <Link className="pb-3 flex items-center" href="/">Following</Link>
        <Link className="hidden pb-3 md:flex items-center" href="/">Market</Link>
        <Link className="hidden pb-3 md:flex items-center" href="/">Communities</Link>
        <Link className="hidden pb-3 md:flex items-center" href="/">Groups</Link>
        <Link className="hidden pb-3 md:flex items-center" href="/">MongoDB</Link>
      </div>
      <Share />
      <Feed />
    </div>
)};

export default Homepage;
